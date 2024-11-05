import classNames from 'classnames/bind';
import styles from './CardBody.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CardBody({ item }) {
    return (
        <div className={cx('wrapper')}>
            <Link style={{ textDecoration: 'none', color: '#000' }} key={item?.id} to={`/prodetail/${item?.id}`}>
                <img src={item?.img} alt="" />
                <div className={cx('info-card')}>
                    <h3>{item?.nameProducts}</h3>
                    <div className={cx('star-card')}>
                        <div>
                            <FontAwesomeIcon id={cx('icons-star')} icon={faStar} />
                            <FontAwesomeIcon id={cx('icons-star')} icon={faStar} />
                            <FontAwesomeIcon id={cx('icons-star')} icon={faStar} />
                            <FontAwesomeIcon id={cx('icons-star')} icon={faStar} />
                            <FontAwesomeIcon id={cx('icons-star')} icon={faStar} />
                        </div>
                        <span>Đã bán 11</span>
                    </div>
                    <div id={cx('price-card')}>{item?.priceNew?.toLocaleString()} đ</div>
                </div>
            </Link>
        </div>
    );
}

export default CardBody;
