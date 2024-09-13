import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";

//* Fetches detailed information about crew/cast
const personDetail = async (req, res) => {
  try {
    const { personId } = req.params;
    const person = await tmdbApi.personDetail({ personId });
    responseHandler.ok(res, person);
  } catch {
    responseHandler.error(res);
  }
};

//* Fetches media associated with crew/cast
const personMedias = async (req, res) => {
  try {
    const { personId } = req.params;
    const medias = await tmdbApi.personMedias({ personId });
    responseHandler.ok(res, medias);
  } catch {
    responseHandler.error(res);
  }
};

export default { personDetail, personMedias };
