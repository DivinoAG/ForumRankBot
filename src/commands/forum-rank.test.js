const { execute } = require('./forum-rank');
const { ChannelType } = require('discord.js');

describe('forum-rank command', () => {
    let mockInteraction;
    let mockChannel;

    beforeEach(() => {
        mockChannel = {
            type: ChannelType.GuildForum,
            name: 'test-forum',
            defaultReactionEmoji: { name: '👍' },
            threads: {
                fetch: jest.fn().mockResolvedValue({
                    threads: new Map([
                        ['thread1', { name: 'Thread 1', appliedTags: ['tag1'], messages: { fetch: jest.fn().mockResolvedValue(new Map([['msg1', { reactions: { cache: new Map([['👍', { emoji: { name: '👍' }, count: 10 }]]) } }]])) } }],
                        ['thread2', { name: 'Thread 2', appliedTags: ['tag2'], messages: { fetch: jest.fn().mockResolvedValue(new Map([['msg2', { reactions: { cache: new Map([['👍', { emoji: { name: '👍' }, count: 5 }]]) } }]])) } }],
                    ]),
                }),
            },
            availableTags: [
                { id: 'tag1', name: 'Tag One' },
                { id: 'tag2', name: 'Tag Two' },
            ],
        };

        mockInteraction = {
            options: {
                getChannel: jest.fn(() => mockChannel),
                getInteger: jest.fn(() => null),
                getBoolean: jest.fn(() => false),
            },
            memberPermissions: {
                has: jest.fn(() => true),
            },
            deferReply: jest.fn(() => Promise.resolve()),
            editReply: jest.fn(() => Promise.resolve()),
            reply: jest.fn(() => Promise.resolve()),
            user: {
                send: jest.fn(() => Promise.resolve()),
            },
        };
    });

    test('should reply with an error if user does not have MANAGE_CHANNELS permission', async () => {
        mockInteraction.memberPermissions.has.mockReturnValue(false);
        await execute(mockInteraction);
        expect(mockInteraction.reply).toHaveBeenCalledWith({
            content: 'You do not have permission to use this command.',
            ephemeral: true,
        });
    });

    test('should reply with an error if selected channel is not a forum channel', async () => {
        mockChannel.type = ChannelType.GuildText;
        await execute(mockInteraction);
        expect(mockInteraction.reply).toHaveBeenCalledWith({
            content: 'The selected channel is not a forum channel. Please select a forum channel.',
            ephemeral: true,
        });
    });

    test('should defer reply', async () => {
        await execute(mockInteraction);
        expect(mockInteraction.deferReply).toHaveBeenCalledWith({ ephemeral: false });
    });

    test('should handle no default reaction emoji', async () => {
        mockChannel.defaultReactionEmoji = null;
        await execute(mockInteraction);
        expect(mockInteraction.editReply).toHaveBeenCalledWith({
            content: 'The forum channel "test-forum" does not have a default reaction emoji configured. Cannot process top posts.',
            ephemeral: true,
        });
    });

    test('should process threads and generate report', async () => {
        await execute(mockInteraction);
        expect(mockInteraction.editReply).toHaveBeenCalled();
        // Further assertions will be added when report generation is fully implemented
    });

    test('should send report as DM if direct_message is true', async () => {
        mockInteraction.options.getBoolean.mockReturnValue(true);
        await execute(mockInteraction);
        expect(mockInteraction.user.send).toHaveBeenCalled();
        expect(mockInteraction.editReply).toHaveBeenCalledWith({ content: 'Report sent to your DMs.', ephemeral: true });
    });
});
