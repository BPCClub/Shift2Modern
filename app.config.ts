export default defineAppConfig({
  docus: {
    title: 'Shift to Modern',
    description: 'The only guide you need to let your teammates adopt modern work flows and tools.',
    url: 'https://shift2modern.dev',
    layout: 'default',
    socials: {
      github: 'BPCClub/Shift2Modern',
    },
    github: {
      repo: 'Shift2Modern',
      owner: 'BPCClub',
      branch: 'main',
      dir: 'content',
      edit: true,
    },
    aside: {
      level: 0,
      exclude: []
    },
    header: {
      logo: false,
      title: 'Shift to Modern',
      showLinkIcon: true,
      exclude: [],
    },
    footer: {
      credits: {
        "icon": "IconDocus",
        "text": "Powered by Docus",
        "href": "https://docus.dev"
      },
      textLinks: [
        {
          text: 'BPCC Present',
          href: 'https://github.com/BPCClub',
          target: '_blank',
        }
      ],

    },
  }
})
