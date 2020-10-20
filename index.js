const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "서버-공지";
const byeChannelName = "출구";
const welcomeChannelComment = "";
const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('켰다.');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "게스트"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('pong');
  }

  if(message.content == '!서버') {
    let img = 'https://media.discordapp.net/attachments/745522194901237860/765568810346217483/KakaoTalk_20201011_194828585.jpg?width=720&height=350';
    let embed = new Discord.RichEmbed()
      .setTitle('일상에 지친 너를 위한 휴게소')
      .setURL('https://open.kakao.com/o/gIg0N6Ac')
      .setAuthor('Equal 두둥등장', img, 'https://open.kakao.com/o/gIg0N6Ac')
      .setThumbnail(img)
      .addBlankField()
      .addField('Equal 두둥등장', '일상에 지친 너를 위한 휴게소')
      .addField('역할', '방장, 고민상담사', true)
      .addField('대표 부방장', '기타 두둥등장', true)
      .addField('대표 고민상담사 ', 'Equal 두둥등장 ', true)
      .addField('서버디자인팀', '쑤_\n 달빛 어스름 쏭이🌙\n\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('기타 두둥등장', img)

      message.channel.send(핑)
    } else if(message.content == '!help') {
      let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
      let commandList = [
        {name: '!help', desc: 'help'},
        {name: 'ping', desc: '현재 핑 상태'},
        {name: 'embed', desc: 'embed 예제1'},
        {name: '!전체공지', desc: 'dm으로 전체 공지 보내기'},
        {name: '!전체공지2', desc: 'dm으로 전체 embed 형식으로 공지 보내기'},
        {name: '!청소', desc: '텍스트 지움'},
        {name: '!초대코드', desc: '해당 채널의 초대 코드 표기'},
        {name: '!초대코드2', desc: '봇이 들어가있는 모든 채널의 초대 코드 표기'},
      ];
    message.channel.send(embed)
  } else if(message.content == '!관리자') {
    let helpImg = 'https://media.discordapp.net/attachments/745522194901237860/765568810346217483/KakaoTalk_20201011_194828585.jpg?width=720&height=350';
    let commandList = [
      {name: '방장', desc: 'Equal 두둥등장'},
      {name: '부방장 대표', desc: '기타 두둥등장'},
      {name: '시스템관리자', desc: 'UsFi٭ＧＲＩ'},
      {name: '고민상담사', desc: '개미 두둥등장'},
      {name: '서버디자인팀', desc: '쑤_    달빛 어스름 쏭이🌙'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('서버관리인', helpImg)
      .setColor('#186de6')
      .setFooter(`커스텀`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}


client.login(token);