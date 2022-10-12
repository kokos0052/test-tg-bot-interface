import "./ProductItem";
import Button from "../Button/Button";

function ProductItem({product, className, onAdd}) {
    function onAddHandler() {
        onAdd(product);
    }
    return (
        <div className={`product ${className}`}>
            <div className="img" />
            <div className="title" >{product.title}</div>
            <div className="description">{product.description}</div>
            <div className="price">
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    )
}

export default ProductItem;