# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte

# create a new project in my-app
npm init svelte my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


## Các bước để ứng dụng hoạt động:

### 1. Cài đặt thư viện

Chạy lệnh sau để cài đặt thư viện:

Nếu sử dụng npm

```bash
npm install
```

Nếu sử dụng yarn

```bash
yarn
```

### 2.Tạo file .env

Copy nội dung từ file `.env.example` sang file `.env`.

Sau đó thay thế các tham số cho phù hợp

### 3. Setup backend

#### - Với backend (laravel) chạy qua môi trường docker

Sử dụng `ip:port` làm domain sau đó vào command của php chạy lệnh:

```bash
chmod -R 777 /var/www/html/storage/
```

#### - Với backend chạy qua môi trường `xampp` hoặc `wampp`

+ Nếu phải setup cổng cho backend thì vui lòng không setup `virtualhost`, để nguyên là `ip:port`. VD: `192.168.5.2:8080`

+ Còn nếu là cổng mặc định `80` thì có thể setup `virtualhost` bình thường

##### *Lưu ý: ip phải là địa chỉ ip của máy tính, không phải ip `127.0.0.1` hoặc `localhost`

### 4. Khởi chạy ứng dụng frontend

Chạy lệnh dưới đây:

- Đối với npm:

```bash
npm run dev
```

- Đối với yarn:

```bash
yarn dev
```

## Link hướng dẫn deploy sveltekit lên server:

https://codepilotsf.medium.com/how-to-deploy-a-sveltekit-node-app-1c11171fe852


## Lỗi node < 16 khi cài đặt svelte kit

### Nếu dùng yarn:

Để cài đặt thư viện svelte chạy lệnh:

```bash
yarn --ignore-engines
```

Để thêm package

```bash
yarn add `package` --ignore-engines
```

### Nếu dùng npm:

Để cài đặt thư viện svelte chạy lệnh:

```bash
npm install --ignore-engines
```

Để thêm package

```bash
npm install `package` --ignore-engines
```

## Lưu ý trong lập trình

### Để biến trong file `.env` hoạt động: 

Đặt tên biến với tiền tố `VITE_`