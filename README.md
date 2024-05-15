<p>Phần mềm sử dụng <b>BE: Java Spring</b> với <b>Maven</b>, <b>Angular</b>  , <b>FE: angular </b> và<b>PrimeNG</b>.</p>
<p>Phần mềm chạy chương trình <b>Visual Studio Code </b>, <b> XamPP </b></p>
<p>1. Thiết lập Backend với Spring Boot và Maven
Cài đặt môi trường: Java Development Kit (JDK), Eclipse IDE, Maven.
Tạo dự án Spring Boot: Sử dụng Spring Initializr để tạo dự án với các dependency cần thiết như Spring Web, Spring Data JPA, H2 Database.
Import vào Eclipse: Import dự án Maven vào Eclipse.
Cấu hình cơ bản: Sửa application.properties để cấu hình cơ sở dữ liệu và các cài đặt cần thiết.
Tạo Controller và Service: Tạo các lớp Java để xử lý các yêu cầu HTTP và logic nghiệp vụ.</p>
<p>2. Thiết lập Frontend với Angular và PrimeNG
Cài đặt môi trường: Node.js và npm, Angular CLI.
Tạo dự án Angular: Sử dụng Angular CLI để khởi tạo dự án Angular.
Cài đặt PrimeNG: Cài đặt PrimeNG và PrimeIcons bằng npm và cấu hình trong angular.json.
Tạo component và service: Tạo các component và service trong Angular để tương tác với API từ backend.</p>
<p>3. Kết nối Backend và Frontend
Cấu hình CORS trong Spring Boot: Cho phép Angular frontend truy cập API của Spring Boot bằng cách cấu hình CORS.
Gọi API từ Angular: Sử dụng HttpClientModule trong Angular để gọi API từ Spring Boot.</p>
<p>4. Chạy và kiểm tra
Chạy backend: Chạy ứng dụng Spring Boot từ Eclipse hoặc bằng lệnh Maven.
Chạy frontend: Chạy ứng dụng Angular bằng lệnh ng serve.</p>

<p> Bước 1: Để import SQL vào <b>Xampp</b>, ta khởi động <b>XamPP</b>, start <b>MySQL</b>, để import SQl chọn <b>Admin</b>, tạo thư mục mới chọn <b>New</b>, chọn <b>Import </b> trên thanh công cụ, tải file lên tại <b>Choose File</b>,  chọn <b>Import</b></p>

<p> Bước 2: khởi động <b>XamPP</b>, start <b>Apache</b></p>

<p> Bước 3: Download file <b>"MaNguonMo_BE"</b>, vào file <b>"MaNguonMo_BE"</b> đã tải, click vào <b>"thanh chỉ đường dẫn của file MaNguonMo_BE"</b> sau đó gõ <b>"cmd"</b>, tại cmd gõ <b> "code ." </b>, sau khi vào được source code bạn tìm <b>"santhuongmaidientu"</b>, chọn <b> "src" </b>, chọn <b> "main"</b>, chọn <b> "java\com\example\santhuongmai"</b>, chọn <b>"SanthuongmaiApplication.java"</b>, click chuột trái <b> "Run Java"</b>, để chạy back-end.

<p> Bước 4: Dơwnload file <b>"MaNguonMo_FE"</b>, vào file <b>"MaNguonMo_FE"</b> đã tải, click vào <b>"thanh chỉ đường dẫn của file MaNguonMo_FE"</b> sau đó gõ <b>"cmd"</b>, tại cmd gõ <b> "ng serve" </b>, sau khoảng thời gian chạy sẽ hiện ra đường đẫn <b>" http://localhost:../"</b>, giữ <b>Ctrl và click chuột vào đường dẫn</b> để chạy front-end.
