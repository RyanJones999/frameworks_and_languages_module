FROM denoland/deno:latest
EXPOSE 8001
WORKDIR /app/
COPY . .
CMD ["deno", "task","--cwd","./src", "start"]