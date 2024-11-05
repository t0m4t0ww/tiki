import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import request from '../../config/connect';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import ModalPayment from '../../Modal/Modal';

const cx = classNames.bind(styles);

function Header() {
    const [dataProducts, setDataProducts] = useState([]);
    const [valueSearch, setValueSearch] = useState('');
    const [dataCart, setDataCart] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setDataCart(JSON.parse(localStorage.getItem('cart')));
    }, []);

    useEffect(() => {
        if (valueSearch.length > 0) {
            request
                .get('/api/search', {
                    params: { nameProduct: valueSearch },
                })
                .then((res) => setDataProducts(res.data));
        }
    }, [valueSearch]);

    const handleShowModal = () => {
        setShow(!show);
    };

    return (
        <div className={cx('wrapper')}>
            <Link style={{ textDecoration: 'none' }} to="/">
                <div className={cx('logo')}>
                    <img
                        src="https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png"
                        alt=""
                    />
                    <h2>Tốt & Nhanh</h2>
                </div>
            </Link>
            <div className={cx('search')}>
                <FontAwesomeIcon icon={faSearch} id={cx('icon-search')} />
                <input placeholder="100% Hàng tuyển chọn" onChange={(e) => setValueSearch(e.target.value)} />
                <button id={cx('btn-search')}>Tìm Kiếm</button>
                {valueSearch.length > 0 ? (
                    <div className={cx('search-result')}>
                        {dataProducts.map((item) => (
                            <Link
                                style={{ textDecoration: 'none', color: '#000' }}
                                key={item.img}
                                to={`/prodetail/${item.id}`}
                            >
                                <div className={cx('item')}>
                                    <img alt="" src={item.img} />
                                    <h3>{item.nameProducts}</h3>
                                    <span>{item?.priceNew?.toLocaleString()} đ</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className={cx('controller')}>
                <ul>
                    <Link style={{ textDecoration: 'none' }} to="/">
                        <li>
                            <FontAwesomeIcon id={cx('icons-li')} icon={faHome} />
                            Trang Chủ
                        </li>
                    </Link>
                    <li>
                        <FontAwesomeIcon id={cx('icons-li')} icon={faFaceSmile} />
                        Tài Khoản
                    </li>
                    <li>
                        <button
                            style={{ border: 'none', background: 'none' }}
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                        >
                            <FontAwesomeIcon id={cx('icons-li')} icon={faCartPlus} />
                        </button>
                    </li>
                </ul>
            </div>
            <div
                className="offcanvas offcanvas-end"
                tabindex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
            >
                <div className="offcanvas-header">
                    <h5 id="offcanvasRightLabel">Giỏ Hàng</h5>
                    <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    {dataCart?.map((item) => (
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <img style={{ width: '50px' }} src={item.img} alt="" />
                                        </th>
                                        <th scope="col">{item.nameProducts}</th>
                                        <th scope="col">{item.priceNew.toLocaleString()} đ</th>
                                        <th scope="col">{item.valueSpan}</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    ))}
                    <button onClick={handleShowModal} type="button" className="btn btn-primary">
                        Thanh Toán
                    </button>
                </div>
            </div>
            <ModalPayment show={show} setShow={setShow} dataCart={dataProducts} />
        </div>
    );
}

export default Header;
