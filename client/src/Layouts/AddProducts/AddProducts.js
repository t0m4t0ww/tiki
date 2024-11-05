import Header from './../Header/Header';
import classNames from 'classnames/bind';
import styles from './AddProducts.module.scss';
import { useEffect, useState } from 'react';
import request from '../../config/connect';
import { ModalAddProduct, ModalDeleteProduct } from '../../Modal/Modal';

const cx = classNames.bind(styles);

function AddProducts() {
    const [dataProducts, setDataProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idProduct, setIdProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await request.get('/api/data');
                setDataProducts(res.data || []); // Đảm bảo dữ liệu là mảng
            } catch (error) {
                console.error('Error fetching products:', error);
                setDataProducts([]); // Đặt mảng trống nếu có lỗi
            }
        };
        fetchData();
    }, []);

    const handleAddProduct = (newProduct) => {
        if (newProduct && newProduct.id) {
            setDataProducts((prevProducts) => [...prevProducts, newProduct]);
        }
        setShowAddModal(false); // Đóng modal sau khi thêm sản phẩm
    };

    const handleShowAddModal = () => setShowAddModal(true);
    const handleCloseAddModal = () => setShowAddModal(false);

    const handleShowDeleteModal = (id) => {
        setShowDeleteModal(true);
        setIdProduct(id);
    };

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>
            <main>
                <div className={cx('add-products')}>
                    <button type="button" className="btn btn-primary" onClick={handleShowAddModal}>
                        Thêm Sản Phẩm
                    </button>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Img</th>
                                <th scope="col">Name Products</th>
                                <th scope="col">Price</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataProducts.length > 0 ? (
                                dataProducts.map((item) =>
                                    item && item.id ? ( // Kiểm tra item có tồn tại và có id
                                        <tr key={item.id}>
                                            <th scope="row">{item.id}</th>
                                            <td>
                                                <img
                                                    style={{ width: '100px' }}
                                                    src={item.img || ''}
                                                    alt={item.nameProducts || 'Image'}
                                                />
                                            </td>
                                            <td>{item.nameProducts || 'No Name'}</td>
                                            <td>{item.priceNew ? item.priceNew.toLocaleString() : '0'} đ</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => handleShowDeleteModal(item.id)}
                                                >
                                                    Xóa Sản Phẩm
                                                </button>
                                            </td>
                                        </tr>
                                    ) : null, // Nếu item không hợp lệ, không render gì cả
                                )
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>
                                        Không có sản phẩm nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
            <ModalAddProduct
                show={showAddModal}
                onClose={handleCloseAddModal} // Hàm đóng modal
                onAddProduct={handleAddProduct} // Truyền hàm thêm sản phẩm
            />
            <ModalDeleteProduct show={showDeleteModal} setShow={setShowDeleteModal} idProduct={idProduct} />
        </div>
    );
}

export default AddProducts;
