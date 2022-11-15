const GroupRepository = require('../repositories/groups.repository')

class GroupService {
    groupRepository = new GroupRepository()

    createGroup = async(groupName,groupImg)=>{
        await this.groupRepository.createGroup(groupName,groupImg)
        return {message:"그룹이 생성되었습니다."}
    }

    updateGroupName =async(groupId,groupName)=>{
        await this.groupRepository.updateGroupName(groupId,groupName)
        return {message:"수정이 완료되었습니다."}
    }

    updateGroupImg =async(groupId,groupImg)=>{
        await this.groupRepository.updateGroupImg(groupId,groupImg)
        return {message:"수정이 완료되었습니다."}
    }

    findOneGroup = async (groupId)=>{
        await this.groupRepository.findOneGroup(groupId)
        return {message:"검색이 완료되었습니다."}
    }

    findAllGroup = async()=>{
        await this.groupRepository.findAllGroup()
        return {message:"검색이 완료되었습니다."}
    }

    destroyGroup = async (groupId)=>{
        await this.groupRepository.destroyGroup(groupId)
    }

    updateNic = async(userId,groupId,groupUserNickname)=>{
        const updateNic = await this.groupRepository.updateNic(userId,groupId,groupUserNickname)
        return{
            groupUserNickname : updateNic.groupUserNickname
        }
    }

    getProfile = async(userId,groupId)=>{
        const getprofile = await this.groupRepository.getprofile(userId,groupId)
        return{
            groupUserNickname : getprofile.groupUserNickname,
            groupAvatarImg  : getprofile.groupAvatarImg
        }
    }
}

module.exports = GroupService