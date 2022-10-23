import { axiosReq } from "../api/axiosDefaults";

// This function was taken from the Code Institute walkthrough project

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.resoults.reduce((acc, cur) => {
        return acc.some(accResult => accResult.id === cur.id)
        ? acc
        : [...acc, cur]
      }, prevResource.results),
    }));
  } catch (err) {}
};
