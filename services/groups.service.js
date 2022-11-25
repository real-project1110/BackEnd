const { ValidationError } = require('sequelize');
const GroupRepository = require('../repositories/groups.repository');

class GroupService {
  groupRepository = new GroupRepository();

  createGroup = async ({ groupName, userId, nickname }) => {
    const groupUserNickname = nickname;
    const createGroup = await this.groupRepository.createGroup({
      groupUserNickname,
      groupName,
      userId,
    });
    return createGroup;
  };

  updateGroupName = async (groupId, groupName) => {
    await this.groupRepository.updateGroupName(groupId, groupName);
    return { message: '수정이 완료되었습니다.' };
  };

  updateGroupImg = async ({ userId, groupId, resizeUrl }) => {
    const findByUser = await this.groupRepository.findByUser({
      userId,
    });
    if (!findByUser) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const findGroupUser = await this.groupRepository.findGroupUser({
      groupId,
    });
    if (!findGroupUser) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const updateGroupImg = await this.groupRepository.updateGroupImg({
      groupId,
      groupUserId: findGroupUser.groupUserId,
      groupImg: resizeUrl,
    });
    return updateGroupImg;
  };

  findOneGroup = async ({ groupId, userId, currentPage }) => {
    const findGroupUser = await this.groupRepository.findGroupUser({
      userId,
      groupId,
    });
    if (!findGroupUser) {
      throw new ValidationError('잘못된 요청입니다.');
    }

    if (currentPage != groupId) {
      await this.groupRepository.updatcurrentPage({
        userId,
        currentPage: groupId,
      });
    }
    
    console.log('11111111111',userId,findGroupUser.userId)
    
    const groups = await this.groupRepository.findOneGroup({
      groupId,
      userId,
    });
    if (!groups) {
      throw new ValidationError('그룹이 없습니다');
    }
    const image = groups.groupImg;
    if (image == null) {
      return {
        groupId: groups.groupId,
        groupName: groups.groupName,
        groupImg: groups.groupImg,
      };
    } else {
      const originalUrl = image.replace(/\/statUS\//, '/original/');
      return {
        groupId: groups.groupId,
        groupName: groups.groupName,
        groupImg: groups.groupImg,
        originalUrl,
      };
    }
  };
  findAllGroupList = async ({ userId }) => {
    const findGroupUserId = await this.groupRepository.findGroupUserId({
      userId,
    });
    if (!findGroupUserId) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const findGroup = await this.groupRepository.findGroup({ findGroupUserId });
    return findGroup;
  };
  //   findGroupUser = async (userId) => {
  //     const findGroupUser = await this.groupRepository.findGroupUser(userId);
  //     return findGroupUser;
  //   };

  //   findAllGroup = async ({ groupIds }) => {
  //     console.log(groupIds);
  //     const groups = [];
  //     for (let i in groupIds) {
  //       groups.push(await this.groupRepository.findOneGroup(i));
  //     }
  //     return groups;
  //   };

  destroyGroup = async (groupId) => {
    await this.groupRepository.destroyGroup(groupId);
  };
  updateNic = async (userId, groupId, groupUserNickname) => {
    const updateNic = await this.groupRepository.updateNic(
      userId,
      groupId,
      groupUserNickname,
    );
    if (!updateNic) {
      throw new Error('유저 정보가 존재하지 않습니다');
    }
  };

  updateNic = async (userId, groupId, groupUserNickname) => {
    const updateNic = await this.groupRepository.updateNic(
      userId,
      groupId,
      groupUserNickname,
    );
    if (!updateNic) {
      throw new Error('유저 정보가 존재하지 않습니다');
    }
    // if (!updateNic.groupId) {
    //   throw new Error('소속되지 않은 그룹입니다');
    // }
    return {
      groupUserNickname: updateNic.groupUserNickname,
    };
  };
  updatGroupAvatarImg = async ({ userId, groupId, resizeUrl }) => {
    const findGroupUser = await this.groupService.findGroupUser({
      userId,
      groupId,
    });
    if (!findGroupUser) {
      throw new ValidationError('그룹유저가 아닙니다.');
    }
    const updatGroupAvatarImg = await this.groupService.updatGroupAvatarImg({
      groupUserId: findGroupUser.groupUserId,
      groupAvatarImg: resizeUrl,
      groupId,
    });
    return updatGroupAvatarImg;
  };

  getProfile = async ({ userId, groupId }) => {
    const getprofile = await this.groupRepository.getprofile({
      userId,
      groupId,
    });
    if (!getprofile) {
      throw new Error('유저 정보가 존재하지 않습니다');
    }

    const image = getprofile.avatarImg;
    if (image == null) {
      return {
        groupUserId: getprofile.groupUserId,
        groupUserNickname: getprofile.groupUserNickname,
        groupAvatarImg: getprofile.groupAvatarImg,
        status: getprofile.status,
        statusMessage: getprofile.statusMessage,
      };
    } else {
      const originalUrl = image.replace(/\/statUS\//, '/original/');
      return {
        groupUserId: getprofile.groupUserId,
        groupUserNickname: getprofile.groupUserNickname,
        groupAvatarImg: getprofile.groupAvatarImg,
        status: getprofile.status,
        statusMessage: getprofile.statusMessage,
        originalUrl,
      };
    }
  };

  getUser = async ({ userId, groupUserId }) => {
    const getUser = await this.groupRepository.getUser({ userId, groupUserId });
    if (!getUser) {
      throw new Error('유저 정보가 존재하지 않습니다');
    }
    const image = getUser.avatarImg;
    if (image == null) {
      return {
        groupUserId: getUser.groupUserId,
        groupUserNickname: getUser.groupUserNickname,
        groupAvatarImg: getUser.groupAvatarImg,
        status: getUser.status,
        statusMessage: getUser.statusMessage,
      };
    } else {
      const originalUrl = image.replace(/\/statUS\//, '/original/');
      return {
        groupUserId: getUser.groupUserId,
        groupUserNickname: getUser.groupUserNickname,
        groupAvatarImg: getUser.groupAvatarImg,
        status: getUser.status,
        statusMessage: getUser.statusMessage,
        originalUrl,
      };
    }
  };

  findAllGU = async (groupId) => {
    const findAllGU = await this.groupRepository.findAllGU(groupId);
    if (!findAllGU) {
      throw new Error('유저정보가 존재하지 않습니다.');
    }
    const result = findAllGU.map((x) => {
      const image = x.groupAvatarImg;
      if (image == null) {
        return {
          groupUserId: x.groupUserId,
          groupUserNickname: x.groupUserNickname,
          groupAvatarImg: x.groupAvatarImg,
          status: x.status,
          statusMessage: x.statusMessage,
        };
      } else {
        const originalUrl = image.replace(/\/statUS\//, '/original/');
        return {
          groupUserId: x.groupUserId,
          groupUserNickname: x.groupUserNickname,
          groupAvatarImg: x.groupAvatarImg,
          status: x.status,
          statusMessage: x.statusMessage,
          originalUrl,
        };
      }
      // const originalUrl = image.replace(/\/statUS\//, '/original/');
    });
    return result;
  };

  postStatus = async (userId, groupId, status, statusMessage) => {
    const poststatus = await this.groupRepository.postStatus(
      userId,
      groupId,
      status,
      statusMessage,
    );
    return {
      status: poststatus.status,
      statusMessage: poststatus.statusMessage,
    };
  };

  updateStatus = async (userId, groupId, status, statusMessage) => {
    const updatestatus = await this.groupRepository.updateStatus(
      userId,
      groupId,
      status,
      statusMessage,
    );
    return {
      status: updatestatus.status,
      statusMessage: updatestatus.status,
    };
  };

  createGroupUser = async (userId, groupId) => {
    const user = await this.groupRepository.findOneId(userId);
    if (!user) {
      throw new Error('유저 정보가 없습니다.');
    }
    const groupuserdup = await this.groupRepository.groupuserdup(
      userId,
      groupId,
    );
    if (!groupuserdup) {
      const groupUser = {
        groupUserNickname: user.nickname,
        userId,
        groupId,
      };
      return await this.groupRepository.createGroupUser(groupUser);
    } else {
      return;
    }
  };

  deletegroupuser = async({userId,groupId})=>{
    const user = await this.groupRepository.getUserId({userId,groupId})
    if(!user){
      throw new Error('유저 정보가 없습니다')
    }
    const deleteGroupUser = await this.groupRepository.deleteGroupUser({groupUserId:user.groupUserId})
    return deleteGroupUser
  }
}

module.exports = GroupService;
