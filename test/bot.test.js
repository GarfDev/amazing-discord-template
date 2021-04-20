import { MessageEmbed } from 'discord.js';
import { expect, test } from 'corde';

test('Ping command result should contain Pong', () => {
  const embed = new MessageEmbed({ description: `Pong!`, color: 3066993 });
  expect('ping').toReturn(embed);
});
