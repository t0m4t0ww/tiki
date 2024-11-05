import classNames from 'classnames/bind';
import styles from './LayoutsMobile.module.scss';
import HeaderMobile from './HeaderMobile/HeaderMobile';
import HomePageMobile from './HomePageMobile/HomePageMobile';

const cx = classNames.bind(styles);

function LayoutsMobile() {
    return (
        <div className={cx('wrapper')}>
            <header>
                <HeaderMobile />
            </header>

            <main className={cx('home-page-mobile')}>
                <HomePageMobile />
            </main>
        </div>
    );
}

export default LayoutsMobile;
