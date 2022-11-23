const InviteService = require('../services/invites.service');

class InviteController {
  inviteService = new InviteService();

  createInvite = async (req, res, next) => {
    try {
      const { email } = req.body;
      const { groupId } = req.params;
      const invite = await this.inviteService.createInvite({ email, groupId });
      res.status(201).json({ data: invite });
    } catch (error) {
      next(error);
    }
  };
  findInvite = async (req, res, next) => {
    try {
      const { user } = res.locals;
      const userId = user.userId;
      const invite = await this.inviteService.findInvite({ userId });
      res.status(200).json({ data: invite });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = InviteController;
