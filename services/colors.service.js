const ColorRepository = require('../repositories/colors.repository');

class ColorService {
  colorRepository = new ColorRepository();

  createColor = async ({ userId, groupId, color, content }) => {
    const getGroupId = await this.colorRepository.getGroupId({
      groupId,
      userId,
    });
    if (!getGroupId) {
      throw new Error('유저 정보가 없습니다');
    }
    if (getGroupId.groupId !== parseInt(groupId)) {
      throw new Error('소속된 그룹이 아닙니다');
    }
    const createColor = await this.colorRepository.createColor({
      groupId,
      color,
      content,
    });
    if (createColor.groupId !== groupId) {
      throw new Error('권한이 없습니다');
    }
    return {
      groupId: getGroupId.groupId,
      color: createColor.color,
      content: createColor.content,
    };
  };
  getColor = async ({ groupId }) => {
    const getColor = await this.colorRepository.findGroupId({ groupId });
    if (!getColor) {
      throw new Error('유저 정보가 존재하지 않습니다');
    }
    const result = getColor.map((x) => {
      return {
        colorId: x.colorId,
        groupId: x.groupId,
        color: x.color,
        content: x.content,
      };
    });
    return result;
  };

  updateColor = async ({ userId, groupId, colorId, color, content }) => {
    const getGroupId = await this.colorRepository.getGroupId({
      userId,
      groupId,
    });
    if (!getGroupId) {
      throw new Error('유저 정보가 없습니다');
    }
    const updateColor = await this.colorRepository.updateColor({
      groupId,
      colorId,
      color,
      content,
    });
    return {
      color: updateColor.color,
      content: updateColor.content,
    };
  }
    deleteColor = async ({ userId, colorId, groupId }) => {
      const getGroupId = await this.colorRepository.getGroupId({
        userId,
        groupId,
      });
      if (!getGroupId) {
        throw new Error('유저 정보가 없습니다');
      }

      const deleteColor = await this.colorRepository.deleteColor({ colorId });
      if (!deleteColor) {
        throw new Error('존재하지 않는 컬러입니다');
      }
      return deleteColor;
    };
  
}
module.exports = ColorService;
