import classNames from 'classnames/bind';
import styles from './DefaultLayouts.module.scss';
import Header from '../Header/Header';
import SlideBar from '../SlideBar/SlideBar';
import HomePage from '../HomePage/HomePage';
import Footer from '../Footer/Footer';

import { useState } from 'react';

const cx = classNames.bind(styles);

function DefaultLayouts() {
    const [checkPrice, setCheckPrice] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <div className={cx('home-page')}>
                <div className={cx('slide-bar')}>
                    <SlideBar setCheckPrice={setCheckPrice} checkPrice={checkPrice} />
                </div>

                <div>
                    <HomePage checkPrice={checkPrice} />
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default DefaultLayouts;
