const express = require('express');
const Message = require('../models/Message');
const auth = require('../middleware/auth');

const router = express.Router();

// Get conversations for user
router.get('/conversations', auth, async (req, res) => {
  try {
    // Get unique threadIds where user is involved
    const threads = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: req.user._id },
            { receiver: req.user._id }
          ]
        }
      },
      {
        $group: {
          _id: '$threadId',
          lastMessage: { $last: '$$ROOT' },
          messageCount: { $sum: 1 },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [
                  { $eq: ['$receiver', req.user._id] },
                  { $eq: ['$read', false] }
                ]},
                1,
                0
              ]
            }
          }
        }
      },
      { $sort: { 'lastMessage.createdAt': -1 } }
    ]);

    // Populate participants for each thread
    const conversations = await Promise.all(
      threads.map(async (thread) => {
        const participants = await Message.findOne({ threadId: thread._id })
          .populate('sender', 'name email')
          .populate('receiver', 'name email');

        return {
          _id: thread._id,
          lastMessage: thread.lastMessage,
          messageCount: thread.messageCount,
          unreadCount: thread.unreadCount,
          participants: [
            participants.sender._id.toString() === req.user._id.toString() ? participants.receiver : participants.sender
          ]
        };
      })
    );

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get messages for user
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id },
        { receiver: req.user._id }
      ]
    })
    .populate('sender', 'name email')
    .populate('receiver', 'name email')
    .sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get messages in a thread
router.get('/thread/:threadId', auth, async (req, res) => {
  try {
    const messages = await Message.find({ threadId: req.params.threadId })
      .populate('sender', 'name email')
      .populate('receiver', 'name email')
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Send message
router.post('/', auth, async (req, res) => {
  try {
    const { receiverId, content, threadId } = req.body;

    const message = new Message({
      sender: req.user._id,
      receiver: receiverId,
      content,
      threadId
    });

    await message.save();

    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'name email')
      .populate('receiver', 'name email');

    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark messages as read
router.put('/read/:threadId', auth, async (req, res) => {
  try {
    await Message.updateMany(
      { threadId: req.params.threadId, receiver: req.user._id },
      { read: true }
    );

    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
