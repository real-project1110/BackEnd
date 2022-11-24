const { InvalidParamsError } = require('../exceptions/index.exception');
const GroupService = require('../services/groups.service');

class GroupController {
  groupService = new GroupService();

  createGroup = async (req, res, next) => {
    try {
      const { groupName } = req.body;
      const { user } = res.locals;
      const userId = user.userId;
      const { nickname } = res.locals.user;
      console.log('real', groupName, userId);
      const createGroup = await this.groupService.createGroup({
        groupName,
        userId,
        nickname,
      });
      console.log(createGroup);
      res.status(201).json({ data: createGroup.groupId });
    } catch (error) {
      next(error);
    }
  };

  updateGroupName = async (req, res) => {
    try {
      const { groupId } = req.params;
      const { groupName } = req.body;
      const updategroup = await this.groupService.updateGroupName(
        groupId,
        groupName,
      );
      res.status(200).json({ data: updategroup });
    } catch (err) {
      res.status(400).json(err);
    }
  };

  updateGroupImg = async (req, res) => {
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
      console.log(
        '사람있어요여기요여기보세요제발요살려주세요여기요제발요잘게요',
        userId,
      );
      if (!userId) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      const findAllGroupList = await this.groupService.findAllGroupList({
        userId,
      });
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
      const destroygroup = await this.groupService.destroyGroup(groupId);
      res.status(200).json({ data: destroygroup });
    } catch (err) {
      res.status(400).json(err);
    }
  };

  updateGroupNic = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { groupId } = req.params;
      const { groupUserNickname } = req.body;
      const updateNic = await this.groupService.updateNic(
        userId,
        groupId,
        groupUserNickname,
      );
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
      console.log(findAllGU);
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
}

module.exports = GroupController;
