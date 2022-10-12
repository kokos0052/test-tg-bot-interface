import Button from "../Button/Button";
import "./Header.css";

function Header() {
  const tg = window.Telegram.WebApp;
  const onClose = () => {
    tg.close();
  };
  return (
    <div className="header">
      <Button onClick={onClose}>Закрыть</Button>
      <span className="username">{tg.initDataUnsave?.user?.username}</span>
    </div>
  );
}

export default Header;
