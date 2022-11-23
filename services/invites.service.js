const InviteRepository = require('../repositories/invites.repository');

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
  deletInvite = async ({ inviteId }) => {
    const deletInvite = await this.inviteRepository.deletInvite({ inviteId });
    return deletInvite;
  };
}

module.exports = InviteService;
