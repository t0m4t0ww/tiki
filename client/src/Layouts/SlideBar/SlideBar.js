import classNames from 'classnames/bind';
import styles from './SlideBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function SlideBar({ setCheckPrice, checkPrice }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('column-sildebar')}>
                <h4>Lọc Sản Phẩm</h4>
                <ul>
                    <li>
                        <input type="checkbox" onChange={() => setCheckPrice(false)} value={!checkPrice} />
                        <label>Giá Từ Cao Đến Thấp</label>
                    </li>
                    <li>
                        <input type="checkbox" onChange={() => setCheckPrice(true)} value={!checkPrice} />
                        <label>Giá Từ Thấp Đến Cao</label>
                    </li>
                </ul>
            </div>

            <div className={cx('column-sildebar')}>
                <h4>Danh Mục Sản Phẩm</h4>
                <ul>
                    <li>English Books</li>
                    <li>Sách Tiếng Việt</li>
                    <li>Văn phòng phẩm</li>
                    <li>Quà lưu niệm</li>
                </ul>
            </div>

            <div className={cx('column-sildebar')}>
                <h4>Nhà cung cấp</h4>
                <ul>
                    <li>
                        <input id={cx('input')} type="checkbox" />
                        Nhà sách Fahasa
                    </li>
                    <li>
                        <input id={cx('input')} type="checkbox" />
                        Bamboo Books
                    </li>
                    <li>
                        <input id={cx('input')} type="checkbox" />
                        Times Books
                    </li>
                    <li>
                        <input id={cx('input')} type="checkbox" />
                        Nhà Sách Trẻ Online
                    </li>
                    <li>
                        <input id={cx('input')} type="checkbox" />
                        Vbooks
                    </li>
                </ul>
            </div>

            <div className={cx('column-sildebar')}>
                <h4>Đánh giá</h4>
                <ul>
                    <li>
                        <FontAwesomeIcon id={cx('icons-star')} icon={faStar} />
                        <FontAwesomeIcon id={cx('icons-star')} icon={faStar} />
                        <FontAwesomeIcon id={cx('icons-star')} icon={faStar} />
                        <FontAwesomeIcon id={cx('icons-star')} icon={faStar} />
                        <FontAwesomeIcon id={cx('icons-star')} icon={faStar} />
                        <span>từ 5 sao</span>
                    </li>
                    <li>
                        <FontAwesomeIcon id={cx('icons-star')} icon={faStar} />
                        <FontAwesomeIcon id={cx('icons-star')} icon={faStar} />
                        <FontAwesomeIcon id={cx('icons-star')} icon={faStar} />
                        <FontAwesomeIcon id={cx('icons-star')} icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <span>từ 4 sao</span>
                    </li>
                    <li>
                        <FontAwesomeIcon id={cx('icons-star')} icon={faStar} />
                        <FontAwesomeIcon id={cx('icons-star')} icon={faStar} />
                        <FontAwesomeIcon id={cx('icons-star')} icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <span>từ 3 sao</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SlideBar;
