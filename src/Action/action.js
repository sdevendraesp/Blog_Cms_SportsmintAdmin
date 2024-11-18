import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  postRequestFormData,
  getsportrequest,
  postsportrequest,
} from "../CoreFiles/helper";
import {
  marketPlacegetRequest,
  marketPlacePostRequest,
  marketPlaceputRequest,
  marketPlacedeleteRequest,
  marketPlacepostRequestFormData,
} from "../CoreFiles/marketplacehelper";

export const LoginAction = (data) => {
  return postRequest("administrator/adminloginCms", data).then((res) => {
    return res.data;
  });
};

export const getUsersListAction = (data) => {
  return getRequest("administrator/getallusers", "", {
    Authorization: data,
  }).then((res) => {
    return res.data;
  });
};

// report list 

export const getactivetournament = (data) => {
  return getsportrequest("administrator/getactivetournament", "", {
    Authorization: data,
  }).then((res) => {
    return res.data;
  });
};

export const getmatcheslist = (data) => {
  return getsportrequest(`administrator/getmatcheslist?tournament_id=${data.id}`, "", {
    Authorization: data.authtoken,
  }).then((res) => {
    return res.data;
  });
};

export const gettournamentplayerslist = (data) => {
  return getsportrequest(`administrator/gettournamentplayerslist?tournament_id=${data.id}`, "", {
    Authorization: data.authtoken,
  }).then((res) => {
    return res.data;
  });
};

export const contestdistributiondetail = (data) => {
  return getsportrequest("administrator/contestdistributiondetail", "", {
    Authorization: data,
  }).then((res) => {
    return res.data;
  });
};
// report list

export const getcmsdataAction = (data) => {
  return getRequest("administrator/getcmsdata", "", {
    Authorization: data,
  }).then((res) => {
    return res.data;
  });
};

export const getdashboardstatisticsAction = (data) => {
  return getRequest("administrator/getdashboardstatistics", "", {
    Authorization: data,
  }).then((res) => {
    return res.data;
  });
};

export const getbonusnftlistAction = (data) => {
  return getRequest("administrator/getbonusnftlist", "", {
    Authorization: data,
  }).then((res) => {
    return res.data;
  });
};

export const getnftpackagesAction = (data) => {
  return getRequest("administrator/getnftpackages", "", {
    Authorization: data,
  }).then((res) => {
    return res.data;
  });
};

export const getContestListAction = (data) => {
  return getsportrequest("administrator/getContestList", "", {
    Authorization: data,
  }).then((res) => {
    return res.data;
  });
};

export const getMatchListAction = (data) => {
  return getsportrequest("administrator/getMatchList", "", {
    Authorization: data,
  }).then((res) => {
    return res.data;
  });
};

export const getWithdrawalListAction = (data) => {
  return getsportrequest("administrator/getWithdrawalList", "", {
    Authorization: data,
  }).then((res) => {
    return res.data;
  });
};

export const getDepositHistoryAction = (data) => {
  return getsportrequest("administrator/getDepositHistory", "", {
    Authorization: data,
  }).then((res) => {
    return res.data;
  });
};

export const get_contest_distribution_detail_listAction = (data) => {
  return getsportrequest("administrator/get_contest_distribution_detail_list", "", {
    Authorization: data,
  }).then((res) => {
    return res.data;
  });
};

export const getContestDetailAction = (token, data) => {
  return postsportrequest("administrator/getContestDetail", data, {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const approveWithdrawalListAction = (data, token) => {
  return postsportrequest("administrator/approveWithdrawalList", data, {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const rejectWithdrawalListAction = (data, token) => {
  return postsportrequest("administrator/rejectWithdrawalList", data, {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const displayNftsAction = (token, filter) => {
  return getRequest(`administrator/displayNfts?tournament_id=${filter?.tournament}&skill_id=${filter?.skill}&country_id=${filter?.country}`, "", {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const displayfilterparameterAction = (data) => {
  return getRequest("user/displayfilterparameter", "", {
    Authorization: data,
  }).then((res) => {
    return res.data;
  });
};

export const addContestAction = (data, token) => {
  return postsportrequest("administrator/addContest", data, {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const generatepromocodeAction = (token, data) => {
  return postRequest("administrator/generatepromocode", data, {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const deleteBonusNftAction = (data, token) => {
  return postRequest("administrator/deleteBonusNft", data, {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const getpromolistAction = (data) => {
  return getRequest("administrator/getpromolist", "", {
    Authorization: data,
  }).then((res) => {
    return res.data;
  });
};

export const displayArrayOfNftAction = (token, data) => {
  return postRequest("administrator/displayArrayOfNft", data, {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const updateFAQAction = (data, token) => {
  return putRequest("administrator/updatefaq", data, {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const updatepackagedetailsAction = (data, token) => {
  return putRequest("administrator/updatepackagedetails", data, {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const deleteContestAction = (data, token) => {
  return getsportrequest(`administrator/deleteContest?contest_id=${data}`, "", {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const deleteFAQAction = (data, token) => {
  console.log(data, token, "login");
  return getRequest(`administrator/deletefaq?id=${data}`, "", {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const deleteplayerAction = (data, token) => {
  console.log(data, token, "login");
  return getRequest(`administrator/deleteplayer?id=${data}`, "", {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const ActiveDeactivePackageAction = (data, token) => {
  console.log(data, token, "login");
  return getRequest(`administrator/activedeactivepackage?id=${data}`, "", {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const createnewpackageAction = (data, token) => {
  return postRequest("administrator/createnewpackage", data, {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const addnewplayerAction = (data, token) => {
  return postRequestFormData("administrator/addnewplayer", data, {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const updatebannerAction = (data, token) => {
  return postRequestFormData("administrator/updatebanner", data, {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const editplayernftAction = (data, token) => {
  return postRequestFormData("administrator/editplayernft", data, {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const getalldatabaseparameterAction = (data) => {
  return getRequest("administrator/getalldatabaseparameter", "", {
    Authorization: data,
  }).then((res) => {
    return res.data;
  });
};


export const allocateBonusNftAction = (data, token) => {
  return postRequest("administrator/allocateBonusNft", data, {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const insertnewFAQAction = (data, token) => {
  return postRequest("administrator/insertfaq", data, {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const updatecmsAction = (data, token) => {
  return putRequest("administrator/updatecmsdata", data, {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const getFAQslistAction = (data) => {
  return getRequest("administrator/getfaq", "", {
    Authorization: data,
  }).then((res) => {
    return res.data;
  });
};

export const getallpurchasedclubAction = (data, token) => {
  return getRequest("administrator/getallpurchasedclub", "", {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const getreferralandmatchinghistory = (data, token) => {
  return getRequest(
    `${data == 1
      ? "administrator/getallreferralearned"
      : "administrator/gettransferhistory"
    }`,
    "",
    {
      Authorization: token,
    }
  ).then((res) => {
    return res.data;
  });
};



export const changePasswordAction = (token, data) => {
  return postRequest("administrator/changePassword", data, {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const getAllMatchListAction = (token) => {
  return getsportrequest("administrator/getAllMatchList", "", {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const getsettingListAction = (token) => {
  return getsportrequest("administrator/getAllSetting", "", {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const updateSettingAction = (token, data) => {
  return postsportrequest("administrator/updateAllSetting", data, {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const getroyaltyListAction = (token) => {
  return getsportrequest("administrator/getRoyaltyDistributionList", "", {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const getreferralListAction = (token) => {
  return getsportrequest("administrator/getReferralDistributionList", "", {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const getContestRoyaltyDistributionListAction = (token) => {
  return getsportrequest(
    "administrator/getContestRoyaltyDistributionList",
    "",
    {
      Authorization: token,
    }
  ).then((res) => {
    return res.data;
  });
};

export const getallmarketplacenftAction = (token, data) => {
  return getsportrequest(
    `administrator/getallmarketplacenft?marketplace_status_id= ${data.packageId}&skill_id=${data.skill}&country_id=${data.country}&tournament_id=${data.tournament}`,
    "",
    {
      Authorization: token,
    }
  ).then((res) => {
    return res.data;
  });
};

export const getContestListByMatchIdAction = (token, data) => {
  return getsportrequest(
    `administrator/getContestListByMatchId?match_id=${data}`,
    "",
    {
      Authorization: token,
    }
  ).then((res) => {
    return res.data;
  });
};

export const getUsersListByContestIdByMatchIdAction = (token, data) => {
  return getsportrequest(
    `administrator/getUsersListByContestId?contest_id=${data}`,
    "",
    {
      Authorization: token,
    }
  ).then((res) => {
    return res.data;
  });
};

export const getDashboardStatisticsAction = (token) => {
  return getsportrequest(`administrator/getDashboardStatistics`, "", {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const getWithdrawtatisticsAction = (token) => {
  return getsportrequest(`administrator/getWithdrawtatistics`, "", {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};

export const getSignupBonusDistributionListAction = (token) => {
  return getsportrequest(`administrator/getSignupBonusDistributionList`, "", {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};


export const api_key_listAction = (data) => {
  return getsportrequest("administrator/api_key_list", "", {
    Authorization: data,
  }).then((res) => {
    return res.data;
  });
};

export const winningDistributionByContestIdAction = (token, data) => {
  return getsportrequest(`administrator/winningDistributionByContestId?contest_id=${data}`, "", {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};



export const getcontestleaderboardAction = (token, data) => {
  return getsportrequest(`administrator/getcontestleaderboard?contest_id=${data}`, "", {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};


export const getwinninglistByMatchIdAction = (token, data) => {
  return getsportrequest(`administrator/getwinninglist?contest_id=${data.contestId}&match_id=${data.matchId}`, "", {
    Authorization: token,
  }).then((res) => {
    return res.data;
  });
};


// blog categories start

export const insertBlogCategory = (data) => {
  console.log("data", data);
  return postRequest("administrator/insertBlogCategory", data).then((res) => {
    return res.data;
  });
};

export const getBlogCategory = (token, data) => {
  return getRequest(`administrator/getBlogCategory`, {
  }).then((res) => {
    return res.data;
  });
};

export const getPressRelease = (token, data) => {
  return getRequest(`administrator/getPressRelease`, {
  }).then((res) => {
    return res.data;
  });
};

export const getBlogAllBlogs = (token, data) => {
  return getRequest(`administrator/getBlogAllBlogs`, {
  }).then((res) => {
    return res.data;
  });
};


export const updateBlogCategory = (data) => {
  return postRequest("administrator/updateBlogCategory", data).then((res) => {
    return res.data;
  });
};


export const deleteBlogCategory = (data) => {
  return postRequest("administrator/deleteBlogCategory", data).then((res) => {
    return res.data;
  });
};

// blog categories end

export const insertBlogs = (data) => {
  return postRequestFormData("administrator/insertBlogs", data).then((res) => {
    return res.data;
  });
};

export const pressRelease = (data) => {
  return postRequestFormData("administrator/pressRelease", data).then((res) => {
    return res.data;
  });
};

export const updatePressRelease = (data) => {
  return postRequestFormData("administrator/updatePressRelease", data).then((res) => {
    return res.data;
  });
};

export const deletePressRelease = (data) => {
  return postRequest("administrator/deletePressRelease", data).then((res) => {
    return res.data;
  });
};

export const statusChangeOfComments = (data) => {
  return postRequest("administrator/statusChangeOfComments", data).then((res) => {
    return res.data;
  });
};

export const statusChangeOfBlog = (data) => {
  return postRequest("administrator/statusChangeOfBlog", data).then((res) => {
    return res.data;
  });
};



export const getCommentsByBlog = (data) => {
  return postRequest("administrator/getCommentsByBlog", data).then((res) => {
    return res.data;
  });
};

export const deleteBlog = (data) => {
  return postRequest("administrator/deleteBlog", data).then((res) => {
    return res.data;
  });
};

export const updateBlogs = (data) => {
  return postRequestFormData("administrator/updateBlogs", data).then((res) => {
    return res.data;
  });
};

export const deleteComments = (data) => {
  return postRequest("administrator/deleteComments", data).then((res) => {
    return res.data;
  });
};

export const imageUpload = (data) => {
  return postRequestFormData("administrator/imageUpload", data).then((res) => {
    return res.data;
  });
};


export const getBlogAllImages = (token, data) => {
  return getRequest(`administrator/getBlogAllImages`, {
  }).then((res) => {
    return res.data;
  });
};

export const deleteBlogImages = (data) => {
  return postRequest("administrator/deleteBlogImages", data).then((res) => {
    return res.data;
  });
};
