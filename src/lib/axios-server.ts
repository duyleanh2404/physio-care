import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { cookies } from "next/headers";

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}[] = [];

let inMemoryAccessToken: string | null = null;

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

const refreshAccessToken = async (): Promise<string> => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    throw new Error("Missing refresh token");
  }

  const res = await axios.post(
    `${process.env.API_URL}/api/v1/auth/refresh`,
    { refreshToken },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    },
  );

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    res.data;

  if (!newAccessToken) {
    throw new Error("Failed to refresh access token");
  }

  const isProd = process.env.NODE_ENV === "production";

  cookieStore.set("accessToken", newAccessToken, {
    path: "/",
    httpOnly: true,
    secure: isProd,
    sameSite: "strict",
  });

  cookieStore.set("refreshToken", newRefreshToken, {
    path: "/",
    secure: isProd,
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });

  inMemoryAccessToken = newAccessToken;
  return newAccessToken;
};

export const createAxios = async (): Promise<AxiosInstance> => {
  const instance = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      let token = inMemoryAccessToken;
      if (!token) {
        const cookieStore = await cookies();
        token = cookieStore.get("accessToken")?.value || null;
      }

      if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
            }
            return instance(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await refreshAccessToken();

          instance.defaults.headers.common["Authorization"] =
            `Bearer ${newToken}`;
          processQueue(null, newToken);

          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          }

          return instance(originalRequest);
        } catch (err) {
          processQueue(err, null);
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};
