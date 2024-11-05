import classNames from 'classnames/bind';
import styles from './DetailProducts.module.scss';
import Header from '../Header/Header';
import HeaderMobile from '../LayoutsMobile/HeaderMobile/HeaderMobile';
import request from '../../config/connect';
import ModalPayment from '../../Modal/Modal';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function DetailProducts() {
    const checkScreen = window.screen.width;
    const id = window.location.pathname.split('/').pop();
    const [dataProducts, setDataProducts] = useState({});
    const [valueSpan, setValueSpan] = useState(1);
    const [cart, setCart] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        request.get('/api/getproduct', { params: { id } }).then((res) => {
            const product = res.data[0]; // Giả sử dữ liệu trả về là mảng, lấy phần tử đầu tiên
            setDataProducts(product);
        });
    }, [id]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            setCart(savedCart);
        }
    }, []);

    const test = dataProducts?.priceNew * valueSpan;

    const handleIncrease = () => {
        setValueSpan((prev) => prev + 1);
    };

    const handleDecrease = () => {
        if (valueSpan > 1) {
            setValueSpan((prev) => prev - 1);
        }
    };

    const handleAddProducts = () => {
        const newProduct = {
            id: dataProducts.id,
            nameProducts: dataProducts.nameProducts,
            img: dataProducts.img,
            priceNew: dataProducts.priceNew,
            valueSpan,
        };
        const newCart = [...cart, newProduct];
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        window.location.reload();
    };

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div className={cx('wrapper')}>
            <header>{checkScreen > 1400 ? <Header /> : <HeaderMobile />}</header>
            <main className={cx('inner')}>
                <div className={cx('column-1')}>
                    <img src={dataProducts.img} alt={dataProducts.nameProducts} />
                    <h4>Đặc điểm nổi bật</h4>
                    <ul>
                        <li>
                            <FontAwesomeIcon id={cx('icons')} icon={faCircleCheck} />
                            Cuốn sách được viết bởi doanh nhân và chuyên gia tài chính Lâm Minh Chánh.
                        </li>
                        <li>
                            <FontAwesomeIcon id={cx('icons')} icon={faCircleCheck} />
                            Nội dung sách được trình bày chi tiết và dễ hiểu.
                        </li>
                        <li>
                            <FontAwesomeIcon id={cx('icons')} icon={faCircleCheck} />
                            Bộ bài giảng trực tuyến tặng kèm cung cấp kiến thức và hướng dẫn từ tác giả.
                        </li>
                    </ul>
                </div>

                <div className={cx('column-2')}>
                    <h1>{dataProducts?.nameProducts}</h1>
                    <span>5.0</span>
                    {[...Array(5)].map((_, index) => (
                        <FontAwesomeIcon key={index} id={cx('icon-star')} icon={faStar} />
                    ))}
                    <div id={cx('price-product')}>{dataProducts?.priceNew?.toLocaleString()} đ</div>
                    <div className={cx('info-product')}>
                        <h4>Thông tin chi tiết</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Phiên bản sách</th>
                                    <th scope="col">phiên bản thường</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Công ty phát hành</th>
                                    <td>Nhã Nam</td>
                                </tr>
                                <tr>
                                    <th scope="row">Ngày xuất bản</th>
                                    <td>2020-03-2</td>
                                </tr>
                                <tr>
                                    <th scope="row">Kích thước</th>
                                    <td>27 x 37 cm</td>
                                </tr>
                                <tr>
                                    <th scope="row">Dịch giả</th>
                                    <td>Quỳnh Chi</td>
                                </tr>
                                <tr>
                                    <th scope="row">Loại bìa</th>
                                    <td>bìa cứng</td>
                                </tr>
                                <tr>
                                    <th scope="row">Số trang</th>
                                    <td>108</td>
                                </tr>
                                <tr>
                                    <th scope="row">Nhà xuất bản</th>
                                    <td>Nhà xuất bản lao động</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={cx('des')}>
                            <img src={dataProducts.img} alt={dataProducts.nameProducts} />
                            <p>{dataProducts?.description}</p>
                        </div>
                    </div>
                </div>

                <div className={cx('column-3')}>
                    <div className={cx('quantity')}>
                        <h4>Số Lượng</h4>
                        <div className={cx('test')}>
                            <button onClick={handleDecrease}>-</button>
                            <span>{valueSpan}</span>
                            <button onClick={handleIncrease}>+</button>
                        </div>
                    </div>
                    <div className={cx('price-product')}>
                        <h4>Tạm Tính</h4>
                        <span>{test.toLocaleString()} đ</span>
                    </div>

                    <div className={cx('btn-buy')}>
                        <button onClick={handleShow} id={cx('btn-1')}>
                            Mua Ngay
                        </button>
                        <button onClick={handleAddProducts} id={cx('btn-2')}>
                            Thêm Vào Giỏ Hàng
                        </button>
                    </div>
                </div>
            </main>
            <ModalPayment show={show} setShow={setShow} dataCart={[dataProducts]} />
        </div>
    );
}

export default DetailProducts;
