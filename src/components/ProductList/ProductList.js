import "./ProductList.css";
import ProductItem from "../ProductItem/ProductItem";
import { useState, useCallback, useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";

const products = [
  { id: "1", title: "Джинсы", price: 5000, description: "Синего цвета прямые" },
  {
    id: "2",
    title: "Куртка",
    price: 12000,
    description: "Зеленого цвета, теплая",
  },
  {
    id: "3",
    title: "Джинсы 2",
    price: 5000,
    description: "Синего цвета прямые",
  },
  {
    id: "4",
    title: "Куртка 8",
    price: 122,
    description: "Зеленого цвета, теплая",
  },
  {
    id: "5",
    title: "Джинсы 3",
    price: 5000,
    description: "Синего цвета прямые",
  },
  {
    id: "6",
    title: "Куртка 7",
    price: 600,
    description: "Зеленого цвета, теплая",
  },
  {
    id: "7",
    title: "Джинсы 4",
    price: 5500,
    description: "Синего цвета прямые",
  },
  {
    id: "8",
    title: "Куртка 5",
    price: 12000,
    description: "Зеленого цвета, теплая",
  },
];

function ProductList() {
  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      price: getTotalPrice(addedItems),
      queryId,   
    };
    fetch("http://78.155.196.241:8000", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
  }, [addedItems, queryId]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [tg, onSendData]);

  function getTotalPrice(items = []) {
    return items.reduce((acc, item) => {
      return (acc += item.price);
    }, 0);
  }

  function onAdd(product) {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить за ${getTotalPrice(newItems)}`,
      });
    }
  }

  return (
    <div className="list">
      {products.map((product) => (
        <ProductItem product={product} onAdd={onAdd} className={"item"} />
      ))}
    </div>
  );
}

export default ProductList;
