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

  updateGroupImg = async (groupId, groupImg) => {
    await this.groupRepository.updateGroupImg(groupId, groupImg);
    return { message: '수정이 완료되었습니다.' };
  };

  findOneGroup = async (groupId) => {
    const groups = await this.groupRepository.findOneGroup(groupId);
    return groups;
  };
  findAllGroupList = async ({ userId }) => {
    const findGroupUserId = await this.groupRepository.findGroupUserId({
      userId,
    });
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
    if (!updateNic.groupId) {
      throw new Error('소속되지 않은 그룹입니다');
    }
    return {
      groupUserNickname: updateNic.groupUserNickname,
    };
  };

  getProfile = async (userId, groupId) => {
    const getprofile = await this.groupRepository.getprofile(userId, groupId);
    if (!getprofile) {
      throw new Error('유저 정보가 존재하지 않습니다');
    }
    return {
      groupUserNickname: getprofile.groupUserNickname,
      groupAvatarImg: getprofile.groupAvatarImg,
    };
  };

  getUser = async (userId, groupUserId) => {
    const getUser = await this.groupRepository.getUser(userId, groupUserId);
    if (!getUser) {
      throw new Error('유저 정보가 존재하지 않습니다');
    }
    return {
      groupUserNickname: getUser.groupUserNickname,
      groupAvatarImg: getUser.groupAvatarImg,
    };
  };

  findAllGU = async (groupId) => {
    const findAllGU = await this.groupRepository.findAllGU(groupId);
    if (!findAllGU) {
      throw new Error('정보가 존재하지 않습니다.');
    }
    const result = findAllGU.map((x) => {
      return {
        groupUserId: x.groupUserId,
        groupUserNickname: x.groupUserNickname,
        groupAvatarImg: x.groupAvatarImg,
        status: x.status,
        statusMessage: x.statusMessage,
      };
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
}

module.exports = GroupService;
