import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";

//* Adds a new favorite item
const addFavorite = async (req, res) => {
  try {
    // Checks if the item is already favorite
    const isFavorite = await favoriteModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });
    if (isFavorite) return responseHandler.ok(res, isFavorite);

    // If not, adds the favorite item to the database
    const favorite = new favoriteModel({
      ...req.body,
      user: req.user.id,
    });
    await favorite.save();
    responseHandler.created(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

//* Removes a favorite item 
const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;

    // Checks if the favorite item exists
    const favorite = await favoriteModel.findOne({
      user: req.user.id,
      _id: favoriteId,
    });
    if (!favorite) return responseHandler.notfound(res);

    await favorite.remove();
    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

//* Gets all favorite items of the current user
const getFavoritesOfUser = async (req, res) => {
  try {
    const favorite = await favoriteModel
      .find({ user: req.user.id })
      .sort("-createdAt");

    responseHandler.ok(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

export default { addFavorite, removeFavorite, getFavoritesOfUser };
