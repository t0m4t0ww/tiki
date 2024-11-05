import classNames from 'classnames/bind';
import styles from './HomePageMobile.module.scss';
import { useState, useEffect } from 'react';
import request from '../../../config/connect';
import CardBody from '../../HomePage/CardBody/CardBody';

const cx = classNames.bind(styles);

function HomePageMobile() {
    const [dataProducts, setDataProducts] = useState([]);

    useEffect(() => {
        request.get('/api/data').then((res) => setDataProducts(res.data));
    }, []);
    return (
        <div className={cx('wrapper')}>
            {dataProducts.map((item) => (
                <CardBody key={item?.id} item={item} />
            ))}
        </div>
    );
}

export default HomePageMobile;
