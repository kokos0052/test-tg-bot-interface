import { useCallback, useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import "./Form.css";

function Form() {
  const [country, setCountry] = useState();
  const [street, setStreet] = useState();
  const [subject, setSubject] = useState();

  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
        country,
        street,
        subject,
    }; 
    tg.sendData(JSON.stringify(data));
  }, [country, street, subject, tg]);

  useEffect(() => {
    tg.WebApp.onEvent("mainButtonClicked", onSendData);
    return tg.WebApp.offEvent("mainButtonClicked", onSendData);
  }, [tg, onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Отправить данные",
    });
  }, [tg]);

  useEffect(() => {
    if (!street || !country) {
      tg.MainButton.hide();
    }
  }, [street, country, tg]);

  function onChangeCountry(e) {
    setCountry(e.target.value);
  }

  function onChangeStreet(e) {
    setStreet(e.target.value);
  }

  function onChangeSubject(e) {
    setSubject(e.target.value);
  }

  return (
    <div className="form">
      <h3>Введите ваши данные</h3>
      <input
        className="input"
        type="text"
        placeholder="Страна"
        value={country}
        onChange={onChangeCountry}
      />
      <input
        className="input"
        type="text"
        placeholder="Улица"
        value={street}
        onChange={onChangeStreet}
      />
      <select className="select" value={subject} onChange={onChangeSubject}>
        <option value="physical">Физ. лицо</option>
        <option value="legal">Юр. лицо</option>
      </select>
    </div>
  );
}

export default Form;
