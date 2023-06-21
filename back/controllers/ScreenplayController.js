import PostModel from "../modules/Scrennplay.js";

// export const getAll = async (req,res) => {
//     try {
//         const {key} = req.query
//         const search = key ? {
//             "$or": [
//                 {title: {$regex: key, $options: "$i"}},
//                 {genre: {$regex: key, $options: "$i"}}
                
//             ]
            
//         } : {}       
//         const posts = await PostModel.find(search).exec();

//         res.json(posts);
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: 'Не удалось get article',
//         });
//     }
// }
export const getAll = async (req, res) => {
    try {
      // Filtering
      const queryObj = { ...req.query };
      const excludeFields = ["page", "sort", "limit", "fields"];
      excludeFields.forEach((el) => delete queryObj[el]);
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  
      let query = PostModel.find(JSON.parse(queryStr));
  
      // Sorting
  
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("createdAt");
      }
  
      // limiting the fields
  
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      } else {
        query = query.select("-__v");
      }
  
      // pagination
  
      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      if (req.query.page) {
        const productCount = await PostModel.countDocuments();
        if (skip >= productCount) throw new Error("This Page does not exists");
      }
      const product = await query;
      res.json(product);
    } catch (error) {
      throw new Error(error);
    }
  };
export const getOne = async (req,res) => {
    try {
        const postId = req.params.id;
      PostModel.findOneAndUpdate(
      {
          _id: postId,
      }, 
      {
        $inc: {viewsCount: 1},
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Не удалось getback article',
            });
        }
        if(!doc) {
            return res.status(404).json({
                message: 'article',
            });
        }

        res.json(doc);
      },
      )
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось get article',
        });
    }
}

export const remove = async (req,res) => {
    try {
        const postId = req.params.id;

       PostModel.findByIdAndDelete(
        {
        _id: postId,
       }, 
       (err, doc) => {
        if (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Не удалось delete article',
        });
        }

        if(!doc) {
            return res.status(404).json({
                message: 'article not found',
            });
        }

         res.json({
            success: true,
         });
       },
       );
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось get article',
        });
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            genre: req.body.genre.split(','),
            author: req.body.author,
        }); 

        const post = await doc.save();

        res.json(post);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось create post',
        });
    }
}

export const update = async (req, res) => {
    try {
      const postId = req.params.id;
  
      await PostModel.findByIdAndUpdate(
        {
          _id: postId,
        },
        {
          title: req.body.title,
          text: req.body.text,
          genre: req.body.genre.split(','),
          author: req.body.author,
          imageUrl: req.body.imageUrl,
        },
      );
  
      res.json({
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось обновить статью',
      });
    }
  };