Đây là hướng dẫn cho chương trình Web Bán Sách Trực Tuyến
 
Mô tả chương trình: 
Website bao gồm 3 loại người dùng tương tác: người dùng không có tài khoản (guest), người dùng có tài khoản (customer), người quản trị hệ thống (admin).

Người dùng không có tài khoản (guest) có các chức năng:
	- Xem danh sách sản phẩm (thiết bị máy tính, mỹ phẩm, quần áo ... tùy theo đề tài, danh sách này lấy từ CSDL)
	-  Xem chi tiết của từng sản phẩm từ danh sách sản phẩm.
	-  Chọn mua từng sản phẩm (có thể chọn mua từ trang Web danh sách sản phẩm hay từ trang Web chi tiết của từng sản phẩm), 
sản phẩm sau khi chọn mua sẽ được đưa vào trong giỏ hàng.
	- Xem giỏ hàng (danh sách sản phầm đã chọn mua, thông tin này lưu trong biến Session, không cần cập nhật CSDL).
	- Khi xem giỏ hàng, có thể chỉnh sửa số lượng của từng sản phẩm trong giỏ hàng (nếu chỉnh sửa số lượng là 0 thì bỏ sản phẩm đó ra khỏi giỏ hàng)
	- Có thể đăng ký tài khoản của website với các thông tin cần thiết (email không trùng với tài khoản khác), 
sau khi đăng ký thành công với thông tin hợp lệ, lưu trữ CSDL + gửi email +  thông báo về tài khoản. 

Người dùng có tài khoản (customer) có thể thực hiện các chức năng của Người dùng không có tài khoản (guest), ngoài ra người dùng có tài khoản (customer) còn có thể:
	- Xử lý thanh toán (chức năng này thực hiện khi giỏ hàng đã có sản phẩm và người dùng đăng nhập thành công vào hệ thống): 
cập nhật thông tin vào CSDL + gửi email + thông báo đăng ký đặt hàng thành công với các thông tin kèm theo. Sau khi xử lý thành công, Session được xóa về null.

Người quản trị hệ thống (admin) có thể thực hiện được chức năng như một người dùng có tài khoản (customer). 
Ngoài ra, chức năng khác dành cho người quản trị hệ thống (admin) 


Hướng dẫn: 
Backend (folder BE): 
Đầu tiên, hãy chắc chắn rằng khi bạn clone về sẽ có 2 file là package.json và package-lock.json.
Sau khi đã có 2 file đó thì vào terminal của VS code hoặc terminal bình thường thì sẽ nhập "cd BE" rồi sau đó nhập "npm install".
Đợi chương trình tải xong các thư viện thì sẽ nhập "npm start" để khởi động server.

Frontend (folder fe): 
Đầu tiên, hãy chắc chắn rằng khi bạn clone về sẽ có 2 file là package.json và package-lock.json.
Sau khi đã có 2 file đó thì vào terminal của VS code hoặc terminal bình thường thì sẽ nhập "cd fe" rồi sau đó nhập "npm install".
Đợi chương trình tải xong các thư viện thì sẽ nhập "npm start" để chạy giao diện chương trình.

Hoặc nếu được thì hãy tải docker về sau đó tạo hoặc đăng nhập vào tài khoản docker. 

Sau đó thì vào terminal của VS code hoặc terminal bình thường thì sẽ nhập "docker-compose up -d" để chạy docker 
Rồi vào docker khỏi động 2 container là aogiench/bookstore_nodejs:frontend và aogiench/bookstore_nodejs:backend. Sau khi khởi động xong thì vào localhost:3000. 
Như vậy với việc thực hiện các bước trên thì bạn đã có thể chạy được chương trình một cách hoàng thiện.

Tài khoản mặc định: 
Admin: Email: tthanhphuc753@gmail.com, Password: 123456
Cilent: Email: tthanhphuc752@gmail.com, Password: 123456