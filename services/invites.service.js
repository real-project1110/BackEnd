const InviteRepository = require('../repositories/invites.repository');
const ValidationError = require('../exceptions/index.exception');

class InviteService {
  inviteRepository = new InviteRepository();

  createInvite = async ({ email, groupId }) => {
    const findUser = await this.inviteRepository.findUser({ email });
    const createInvite = await this.inviteRepository.createInvite({
      findUser,
      groupId,
    });
    return createInvite;
  };

  findInvite = async ({ userId }) => {
    const findGroup = await this.inviteRepository.findGroup({ userId });
    const invite = await this.inviteRepository.findInvite({
      userId,
      findGroup,
    });
    return invite;
  };
  deletInvite = async ({ userId, inviteId }) => {
    const findUserId = await this.inviteRepository.findUserId({ userId });
    if (!findUserId) {
      throw new ValidationError('잘못된 요청입니다.');
    }
    const deletInvite = await this.inviteRepository.deletInvite({ inviteId });
    return deletInvite;
  };
}

module.exports = InviteService;
