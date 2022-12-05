const { InvalidParamsError } = require('../exceptions/index.exception');
const GroupService = require('../services/groups.service');
const { redisSet } = require('../middlewares/cacheMiddleware');

class GroupController {
  groupService = new GroupService();

  createGroup = async (req, res, next) => {
    try {
      const { groupName } = req.body;
      const { userId, nickname, avatarImg } = res.locals.user;
      console.log(userId, nickname, avatarImg);
      if (!userId || !nickname || !groupName || !avatarImg) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      const createGroup = await this.groupService.createGroup({
        groupName,
        userId,
        nickname,
        avatarImg,
      });
      res.status(201).json({ data: createGroup.groupId });
    } catch (error) {
      next(error);
    }
  };

  updateGroupName = async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const { groupName } = req.body;
      const { userId } = res.locals.user;
      const updategroup = await this.groupService.updateGroupName({
        groupId,
        groupName,
        userId,
      });
      res.status(200).json({ data: updategroup });
    } catch (error) {
      next(error);
    }
  };

  updateGroupImg = async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const { userId } = res.locals.user;
      const originalUrl = req.file.location;
      if (originalUrl) {
        const resizeUrl = originalUrl.replace(/\/original\//, '/statUS/');
        const updategroup = await this.groupService.updateGroupImg({
          userId,
          groupId,
          resizeUrl,
        });
        return res.status(200).json({ ok: true, data: updategroup });
      } else {
        const resizeUrl = originalUrl.replace(/\/original\//, '/statUS/');
        const updategroup = await this.groupService.updateGroupImg({
          userId,
          groupId,
          resizeUrl: null,
        });
        return res.status(200).json({ ok: true, data: updategroup });
      }
    } catch (error) {
      next(error);
    }
  };
  //*속해있는roomId 모아주기
  findOneGroup = async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const { userId, currentPage } = res.locals.user;
      if (!groupId || !userId) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      const findgroup = await this.groupService.findOneGroup({
        groupId,
        userId,
        currentPage,
      });
      res.status(200).json({ data: findgroup });
    } catch (error) {
      next(error);
    }
  };
  findAllGroupList = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      if (!userId) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      const findAllGroupList = await this.groupService.findAllGroupList({
        userId,
      });
      // await redisSet(req.originalUrl, JSON.stringify(findAllGroupList), 432000);
      res.status(200).json({ ok: true, data: findAllGroupList });
    } catch (error) {
      next(error);
    }
  };
  //   findAllGroup = async (req, res, next) => {
  //     try {
  //       const { user } = res.locals;
  //       const userId = user.userId;
  //       const findgroup = await this.groupService.findGroupUser(userId);
  //       const groupList = await this.groupService.findAllGroup(findgroup);
  //       res.status(200).json({ data: groupList });
  //     } catch (error) {
  //       next(error);
  //     }
  //   };

  destroyGroup = async (req, res) => {
    try {
      const { groupId } = req.params;
      const { userId } = res.locals.user;
      const destroygroup = await this.groupService.destroyGroup({
        groupId,
        userId,
      });
      res.status(200).json({ data: destroygroup });
    } catch (error) {
      next(error);
    }
  };

  updateGroupNic = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { groupId } = req.params;
      const { groupUserNickname } = req.body;
      const updateNic = await this.groupService.updateNic({
        userId,
        groupId,
        groupUserNickname,
      });
      res.status(200).json({
        data: updateNic.groupUserNickname,
        message: '그룹내 닉네임 변경완료',
      });
    } catch (error) {
      next(error);
    }
  };

  findGroupProfile = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { groupId } = req.params;
      if (!userId || !groupId) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      const getProfile = await this.groupService.getProfile({
        userId,
        groupId,
      });
      res.status(200).json({ data: getProfile });
    } catch (error) {
      next(error);
    }
  };
  updatGroupAvatarImg = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { groupId } = req.params;
      const originalUrl = req.file.location;
      if (!userId || !groupId) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      if (originalUrl) {
        const resizeUrl = originalUrl.replace(/\/original\//, '/statUS/');
        const updatGroupAvatarImg = await this.groupService.updatGroupAvatarImg(
          {
            userId,
            resizeUrl,
            groupId,
          },
        );
        return res.status(200).json({ ok: true, data: updatGroupAvatarImg });
      } else {
        return res.status(200).json({ ok: true });
      }
    } catch (error) {
      next(error);
    }
  };

  findGroupUser = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { groupUserId } = req.params;
      if (!userId || !groupUserId) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      const getUser = await this.groupService.getUser({ userId, groupUserId });
      res.status(200).json({ data: getUser });
    } catch (error) {
      next(error);
    }
  };

  findAllGroupUser = async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const findAllGU = await this.groupService.findAllGU(groupId);
      res.status(200).json({ data: findAllGU });
    } catch (error) {
      next(error);
    }
  };

  postStatus = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { groupId } = req.params;
      const { status, statusMessage } = req.body;
      const poststatus = await this.groupService.postStatus(
        userId,
        groupId,
        status,
        statusMessage,
      );
      res.status(201).json({ data: poststatus });
    } catch (error) {
      next(error);
    }
  };

  changeStatus = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { groupId } = req.params;
      const { status, statusMessage } = req.body;
      const updateStatus = await this.groupService.updateStatus(
        userId,
        groupId,
        status,
        statusMessage,
      );
      res
        .status(200)
        .json({ data: updateStatus.statusMessage, message: '상태변경완료' });
    } catch (error) {
      next(error);
    }
  };

  createGroupUser = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { groupId } = req.body;
      const creategroupuser = await this.groupService.createGroupUser(
        userId,
        groupId,
      );
      res.status(201).json({ data: creategroupuser });
    } catch (error) {
      next(error);
    }
  };

  deleteGroupUser = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { groupId } = req.params;
      const deletegroupuser = await this.groupService.deletegroupuser({
        userId,
        groupId,
      });
      res.status(200).json({ data: deletegroupuser });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = GroupController;
