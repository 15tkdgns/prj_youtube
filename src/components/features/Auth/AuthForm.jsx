import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

export default function AuthForm({ mode = "login" }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      const success = login(username, password);
      if (!success) {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      } else {
        alert("로그인 성공!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto space-y-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold text-center">
        {mode === "login" ? "로그인" : "회원가입"}
      </h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {mode === "login" ? "로그인" : "회원가입"}
      </button>
    </form>
  );
}
