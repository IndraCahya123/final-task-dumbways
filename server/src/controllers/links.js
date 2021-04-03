const { Brand, Link } = require("../../models");

exports.addBrand = async (req, res) => {
    try {
        const { id } = req.userId;
    
        await Brand.create({
                title: req.body.title,
                description: req.body.description,
                uniqueLink: req.body.unique,
                viewCount: 0,
                templateId: 1,
                userId: id,
        });
        
        res.send({
            status: "success",
            message: "success add brand"
        })
    } catch (error) {
        console.log(error);
    }
}

exports.addLinks = async (req, res) => {
    try {
        // const detailLink = await LinkDetail.findOne({
        //     where: {
        //         uniqueLink: req.body.linkDetailUniqueLink
        //     }
        // })

        const links = await Link.create({
            brandUniqueLink: req.body.uniqueKeyLink,
            title: req.body.title,
            url: req.body.url,
            image: req.files.image[0].filename
        });

        res.send({
            status: "success",
            message: "success add links",
            data: {
                links 
            }
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getMyLinks = async (req, res) => {
    try {
        const { id } = req.userId;

        //search all links by logged user id
        const brands = await Brand.findAll({
            where: {
                userId: id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "UserId"]
            }
        });

        let links = [];

        for (let i = 0; i < brands.length; i++) {
            const allLinks = await Link.findAll({
                where: {
                    brandUniqueLink: brands[i].uniqueLink
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt",`uniqueLink`, `LinkDetailId`]
                }
            });

            const modifiedImg = allLinks.map(link => {
                return {
                    ...link.dataValues,
                    image: process.env.IMG_URL + link.image
                }
            })

            const myLinks = {
                ...detailLinks[i].dataValues,
                links: modifiedImg
            }

            links.push(myLinks);
        }

        res.send({
            status: "success",
            message: "success to get your links",
            data: {
                links
            }
        })
    } catch (error) {
        console.log(error);
    }
}