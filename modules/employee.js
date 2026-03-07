document.addEventListener('DOMContentLoaded', () => {

  // Hiển thị thời gian thực
  function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('vi-VN', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
    document.getElementById('currentTime').textContent = timeStr;
  }
  updateTime();
  setInterval(updateTime, 30000);


  // Xử lý form đặt phòng (demo)
  const form = document.getElementById('bookingForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
      customerName: document.getElementById('customerName').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      idNumber: document.getElementById('idNumber').value.trim(),
      roomType: document.getElementById('roomType').value,
      roomNumber: document.getElementById('roomNumber').value,
      guestCount: document.getElementById('guestCount').value,
      checkInDate: document.getElementById('checkInDate').value,
      checkInTime: document.getElementById('checkInTime').value,
      checkOutDate: document.getElementById('checkOutDate').value,
      checkOutTime: document.getElementById('checkOutTime').value,
      notes: document.getElementById('notes').value.trim()
    };

    if (!data.customerName || !data.phone || !data.roomType || !data.checkInDate || !data.checkOutDate) {
      alert('Vui lòng điền đầy đủ các trường bắt buộc!');
      return;
    }

    // Ở đây bạn sẽ gọi API thực tế
    console.log('Dữ liệu đặt phòng:', data);
    alert('Đặt phòng thành công!\nMã đặt phòng tạm: BK' + Date.now().toString().slice(-6));

    // Reset form (tuỳ chọn)
    // form.reset();
  });


  // Demo: khi chọn loại phòng thì load số phòng khả dụng (giả lập)
  document.getElementById('roomType').addEventListener('change', function() {
    const roomSelect = document.getElementById('roomNumber');
    roomSelect.innerHTML = '<option value="">Đang tải...</option>';

    setTimeout(() => {
      const type = this.value;
      let options = [];

      if (type === 'single')      options = ['101', '102', '105', '108'];
      else if (type === 'double') options = ['201', '203', '206', '209'];
      else if (type === 'twin')   options = ['301', '302', '304'];
      else if (type === 'family') options = ['401', '402'];
      else if (type === 'dorm')   options = ['D01', 'D02', 'D05'];

      roomSelect.innerHTML = '<option value="">-- Chọn số phòng --</option>';
      options.forEach(r => {
        roomSelect.innerHTML += `<option value="${r}">${r}</option>`;
      });
    }, 600);
  });

});