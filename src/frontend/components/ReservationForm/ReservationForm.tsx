
"use client";

import { time } from "console";
import "./ReservationStyles.css";
import { useState } from "react";

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    guests: 0,
    date: "",
    time: "",
    customer_name: "",
    table_number: "",
    branch_id: ""
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // TODO: Send the form data to the API or process it further
    
  };

  return (
    <div className="reservation-form-container">
      <form onSubmit={handleSubmit} className="reservation-form">
        <div className="form-header">
          <h1 className="form-title">Đặt bàn</h1>
          <p className="form-subtitle">Vui lòng điền đầy đủ thông tin</p>
        </div>



        <div className="form-group">
          <label htmlFor="user_id" className="form-label">User ID</label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={document.cookie.split('; ').find(row => row.startsWith('user_id='))?.split('=')[1] || ''}
            readOnly
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="branch_id" className="form-label">Chọn chi nhánh</label>
          <select
            id="branch_id"
            name="branch_id"
            value={formData.branch_id}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Chọn chi nhánh</option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={`option${i + 1}`}>Option {i + 1}</option>
            ))}
          </select>
        </div>

        
        <div>
          <div className="form-group">
            <label htmlFor="date" className="form-label">Chọn ngày</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div>
          <div className="form-group">
            <label htmlFor="date" className="form-label">Chọn Giờ</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>


        <button
          type="submit"
          className="submit-button"
          onClick={() => {
            const cookies = document.cookie;
            const role = cookies.split('; ').find(row => row.startsWith('role='))?.split('=')[1];
            const token = cookies.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            const username = cookies.split('; ').find(row => row.startsWith('username='))?.split('=')[1];
            const user_id = cookies.split('; ').find(row => row.startsWith('user_id='))?.split('=')[1];

            const checkedItems = JSON.parse(localStorage.getItem('checkedItems') || '[]');
            const formattedCheckedItems = checkedItems.map((item: { id: string, quantity: number }) => `ID: ${item.id}, Quantity: ${item.quantity}`).join('\n');
            const totalAmount = localStorage.getItem('totalAmount');
            console.log("Cookies:", cookies);
            console.log("Role:", role);
            console.log("Token:", token);
            console.log("User Name:", username);
            console.log("user_id: ", user_id);
            console.log("Customer Name:", formData.customer_name);
            console.log("Table Number:", formData.table_number);
            console.log("Checked Items:", formattedCheckedItems);
            console.log("Total Amount:", totalAmount);

            // đợi API của Quân Bùi
            fetch('/api/reservations', {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
              user_id,
              customer_name: formData.customer_name,
              table_number: formData.table_number,
              items: checkedItems,
              total_amount: totalAmount,
              time: formData.time,
              date: formData.date,
              branch_id: formData.branch_id,

              })
            })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
              alert(`Form Data:\nuser_id: ${user_id}\nRole: ${role}\nDate: ${formData.date}\nTime: ${formData.time}\nBranch ID: ${formData.branch_id}\nChecked Items:\n${formattedCheckedItems}\nTotal Amount: ${totalAmount}`);
            });
          }}
        >
          Gửi
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;