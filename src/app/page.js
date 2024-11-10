"use client";
import React, { useState, useEffect } from 'react';
import { FaUnlock, FaLock, FaCrown, FaBell, FaTasks, FaChartLine, FaCog } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [meritPoints, setMeritPoints] = useState(295);
  const [quote, setQuote] = useState("ชีวิตนี้น้อยนัก แต่ชีวิตนี้สำคัญนัก");
  const [userStatus, setUserStatus] = useState("Beginner Merit Seeker");
  const [activityHistory, setActivityHistory] = useState([
    { id: 1, description: "สะสมบุญใกล้บ้าน", points: 50, image: "https://static.thairath.co.th/media/dFQROr7oWzulq5FZYjXiaKmVO3vcxON9xLf2HYojmsfQAfq5rjDmmiJhYZiOmWuToDF.jpg" },
    { id: 2, description: "ฟังธรรมประจำวัน", points: 30, image: "https://images.unsplash.com/photo-1530847887473-36dbaf586122?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ" },
    { id: 3, description: "งานวัดที่ใกล้มาถึง", points: 70, image: "https://cdn.chiangmainews.co.th/wp-content/uploads/2019/01/06133012/2109052.jpg" },
  ]);
  const [rewards, setRewards] = useState([
    { id: 1, name: "สิทธิพิเศษ 1", status: "ปลดล็อคแล้ว" },
    { id: 2, name: "สิทธิพิเศษ 2", status: "ปลดล็อคแล้ว" },
    { id: 3, name: "สิทธิพิเศษ 3", status: "ยังไม่ปลดล็อค" },
  ]);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "คุณมีภารกิจพิเศษที่ยังไม่เสร็จ!" }
  ]);

  const statisticsData = [
    { name: 'ทำบุญครั้งที่ 1', times: activityHistory.length }
  ];

  return (
    <div className="min-h-screen bg-white text-white font-['Anuphan'] flex flex-col items-center bg-cover bg-center" style={{ backgroundImage: "url('/images/full-moon-night-doi-suthep-temple-chiangmai-thailand.jpg')" }}>
      {/* Smooth Scroll */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Header */}
      <header className="w-full p-5 bg-[#1478D2] text-white text-center">
        <h1>สวัสดี คุณเคน</h1>
        <p>บุญรักษา</p>
      </header>

      {/* Profile Section */}
      <section id="profile" className="w-full p-5 flex items-center justify-between bg-gray-100 bg-opacity-90">
        <div className="flex items-center gap-4">
          <img src="https://cdni-hw.ch7.com/dm/sz-md/i/images/2024/01/04/6596635ba58c56.73311328.jpg" alt="Profile" className="w-12 h-12 rounded-full" />
          <div>
            <p className="font-bold text-secondary">ชื่อผู้ใช้: คุณเคน</p>
            <p className="text-sm text-secondary">{userStatus}</p>
          </div>
        </div>
        <button className="text-blue-500 flex items-center gap-2">
          <FaCog className="text-lg" /> การตั้งค่า
        </button>
      </section>

      {/* Main Content */}
      <main className="flex-grow w-full p-5">
        {/* Overview Section */}
        <section id="overview" className="text-center mb-5">
          <div className="bg-blue-200 text-white p-5 rounded-full w-32 h-32 mx-auto flex items-center justify-center text-3xl">
            {meritPoints} <span className="text-sm">MERIT</span>
          </div>
          <h2 className="mt-3 text-lg text-white">{userStatus}</h2>
          <p className="text-sm mt-2 text-white">{quote}</p>
        </section>

        {/* Statistics Section */}
        <section id="statistics" className="w-full mb-5">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <FaChartLine className="text-blue-500" /> ความก้าวหน้าในการสะสมแต้มบุญ
          </h2>
          <div className="bg-gray-200 rounded-full h-4 mb-2">
            <div className="bg-[#1478D2] h-4 rounded-full" style={{ width: `${(meritPoints / 1000) * 100}%` }}></div>
          </div>
          <p className="text-center text-sm text-white">{((meritPoints / 1000) * 100).toFixed(0)}% ของเป้าหมาย 1000 แต้ม</p>
          {/* Simple Bar Chart */}
          <div className="bg-[#F2F4F7] p-5 rounded-lg mt-5 shadow-md">
            <h3 className="text-lg font-semibold text-[#0D2745] mb-3 text-center">สถิติการสะสมบุญ</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={statisticsData} barCategoryGap="30%">
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#555" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#555" }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #DDDDDD', borderRadius: '5px' }} 
                  itemStyle={{ color: '#0D2745' }} 
                />
                <Bar dataKey="times" fill="#1478D2" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-center text-2xl font-medium text-[#0D2745] mt-4">รวม: {activityHistory.length} ครั้ง</p>
          </div>
        </section>

        {/* Notifications Section */}
        <section id="notifications" className="w-full mt-5 mb-5">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <FaBell className="text-red-500" /> การแจ้งเตือน
          </h2>
          <div className="flex flex-col gap-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-4 bg-red-100 rounded-lg flex items-center gap-2">
                <span role="img" aria-label="alert" className="text-xl">⚠️</span>
                <p>{notification.message}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Activities Section */}
        <section id="activities" className="w-full mt-5 mb-5">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <FaTasks className="text-blue-500" /> รายการกิจกรรมสะสมบุญ
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {activityHistory.map((activity) => (
              <div key={activity.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img src={activity.image} alt={activity.description} className="w-full h-32 object-cover" />
                <div className="p-4 flex flex-col items-center">
                  <p className="text-center font-medium text-[#0D2745]">{activity.description}</p>
                  <p className="text-green-600 font-bold mt-2">+{activity.points} MERIT</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rewards Section */}
        <section id="rewards" className="w-full mt-5 mb-12">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <FaCrown className="text-yellow-500" /> รางวัลและสิทธิพิเศษ
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {rewards.map((reward) => (
              <div key={reward.id} className={`p-4 rounded-lg text-center flex flex-col items-center ${reward.status === "ปลดล็อคแล้ว" ? "bg-green-100" : "bg-red-100"}`}>
                {reward.status === "ปลดล็อคแล้ว" ? <FaUnlock className="text-green-600 mb-2 text-xl" /> : <FaLock className="text-red-600 mb-2 text-xl" />}
                <p className="text-[#0D2745]">{reward.name}</p>
                <p className="text-sm text-[#0D2745]">{reward.status}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#0D2745] text-white p-2 flex justify-around md:justify-between fixed bottom-0 ">
        <a href="#overview" aria-label="หน้าแรก" className="text-center flex flex-col items-center">
          🏠 <span className="text-xs md:text-sm">หน้าแรก</span>
        </a>
        <a href="#activities" aria-label="กิจกรรม" className="text-center flex flex-col items-center">
          🎯 <span className="text-xs md:text-sm">กิจกรรม</span>
        </a>
        <a href="#rewards" aria-label="รางวัล" className="text-center flex flex-col items-center">
          🏆 <span className="text-xs md:text-sm">รางวัล</span>
        </a>
        <a href="#notifications" aria-label="การแจ้งเตือน" className="text-center flex flex-col items-center">
          🔔 <span className="text-xs md:text-sm">แจ้งเตือน</span>
        </a>
        <a href="#profile" aria-label="โปรไฟล์" className="text-center flex flex-col items-center">
          👤 <span className="text-xs md:text-sm">โปรไฟล์</span>
        </a>
        <a href="#statistics" aria-label="สถิติ" className="text-center flex flex-col items-center">
          📊 <span className="text-xs md:text-sm">สถิติ</span>
        </a>
      </footer>
    </div>
  );
}
