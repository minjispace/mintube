// video
const videoRequiredInfo = {
  select: {
    id: true,
    title: true,
    description: true,
    viewCount: true,
    fileUrl: true,
    userId: true,
    createdAt: true,
    user: {
      select: {
        name: true,
        email: true,
        id: true,
      },
    },
    comment: {
      select: {
        id: true,
        message: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            email: true,
            id: true,
          },
        },
      },
    },
  },
};

//  comment
const commentRequiredInfo = {
  select: {
    id: true,
    message: true,
    createdAt: true,
    user: {
      select: {
        name: true,
        email: true,
        id: true,
      },
    },
    video: {
      select: {
        id: true,
      },
    },
  },
};

export {videoRequiredInfo, commentRequiredInfo};
