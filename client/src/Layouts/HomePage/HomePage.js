import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import CardBody from './CardBody/CardBody';
import { useEffect, useState } from 'react';

import request from '../../config/connect';

const cx = classNames.bind(styles);

function HomePage({ checkPrice }) {
    const [dataProducts, setDataProducts] = useState([]);

    useEffect(() => {
        request.get('/api/data').then((res) => setDataProducts(res.data));
    }, []);

    return (
        <div className={cx('wrapper')}>
            {dataProducts
                .sort(checkPrice ? (a, b) => a.priceNew - b.priceNew : (a, b) => b.priceNew - a.priceNew)
                .map((item) => (
                    <CardBody item={item} />
                ))}
        </div>
    );
}

export default HomePage;
