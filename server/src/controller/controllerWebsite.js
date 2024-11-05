const ModelProducts = require('../model/ModelProducts');

class ControllerWebsite {
    async GetData(req, res) {
        ModelProducts.find({}).then((dataProducts) => res.status(200).json(dataProducts));
    }
    GetOneProduct(req, res) {
        const id = req.query.id;
        ModelProducts.findOne({ id: id }).then((dataProducts) => res.status(200).json([dataProducts]));
    }
    async SearchProduct(req, res) {
        const keyword = req.query.nameProduct;
        ModelProducts.find({ nameProducts: { $regex: keyword, $options: 'i' } }).then((dataProducts) => {
            if (dataProducts.length <= 0) {
                return res.status(200).json([
                    {
                        img: 'https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
                        nameProducts: 'Không Tìm Thấy Sản Phẩm !!!',
                        priceNew: 0,
                    },
                ]);
            } else {
                return res.status(200).json(dataProducts);
            }
        });
    }
    async AddProduct(req, res) {
        const { nameProduct, imgProduct, priceProduct, desProduct, checkProduct } = req.body;

        try {
            let dataProduct = await ModelProducts.findOne({}).sort({ id: 'desc' }).exec();

            let newProductId = 1; // Default id if no products exist in the database
            if (dataProduct) {
                newProductId = dataProduct.id + 1;
            }

            const newProduct = new ModelProducts({
                id: newProductId,
                nameProducts: nameProduct,
                img: imgProduct,
                priceNew: priceProduct,
            });

            await newProduct.save();
            return res.status(200).json({ message: 'Thêm Sản Phẩm Thành Công !!!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async DeleteProduct(req, res) {
        ModelProducts.deleteOne({ id: req.body.id }).then((dataProduct) =>
            res.status(200).json({ message: 'Xóa Sản Phẩm Thành Công !!!', dataProduct }),
        );
    }
}

module.exports = new ControllerWebsite();
