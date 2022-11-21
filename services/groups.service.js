const GroupRepository = require('../repositories/groups.repository')


class GroupService {
    groupRepository = new GroupRepository()

    createGroup = async(groupName,groupImg,userId)=>{
        await this.groupRepository.createGroup(groupName,groupImg,userId)
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
        const groups= await this.groupRepository.findOneGroup(groupId)
        return groups
    }

    findAllGroup = async()=>{
        const groups=await this.groupRepository.findAllGroup()
        return groups
    }

    destroyGroup = async (groupId)=>{
        await this.groupRepository.destroyGroup(groupId)
    }
    updateNic = async(userId,groupId,groupUserNickname)=>{
        const updateNic = await this.groupRepository.updateNic(userId,groupId,groupUserNickname)
        if(!updateNic){
            throw new Error('유저 정보가 존재하지 않습니다')
        }
        return{
            groupUserNickname : updateNic.groupUserNickname
        }
    }

    getProfile = async(userId,groupId)=>{
        const getprofile = await this.groupRepository.getprofile(userId,groupId)
        if(!getprofile){
            throw new Error('유저 정보가 존재하지 않습니다')
        }
        return{
            groupUserNickname : getprofile.groupUserNickname,
            groupAvatarImg  : getprofile.groupAvatarImg
        }
    }

    getUser = async(userId,groupUserId)=>{
        const getUser = await this.groupRepository.getUser(userId,groupUserId)
        if(!getUser){
            throw new Error('유저 정보가 존재하지 않습니다')
        }
        return{
            groupUserNickname : getUser.groupUserNickname,
            groupAvatarImg : getUser.groupAvatarImg
        }
    }

    findAllGU = async(userId,groupId)=>{
        const findAllGU = await this.groupRepository.findAllGU(userId,groupId)
        if(!findAllGU){
            throw new Error('정보가 존재하지 않습니다.')
        }
        return {
            groupUserId : findAllGU.groupUserId,
            groupUserNickname : findAllGU.groupUserNickname,
            groupAvatarImg : findAllGU.groupAvatarImg
        }
    }
}

module.exports = GroupService