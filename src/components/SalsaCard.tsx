import React, { useState } from 'react';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardMedia,
  Divider,
  IconButton,
  Link,
  SvgIcon,
  Tooltip,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Users as UsersIcon } from 'react-feather';
import type { Theme } from 'src/theme';
import type { Salsa } from 'src/types/salsa';

interface SalsaCardProps {
  className?: string;
  project: Salsa;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  image: {
    height: 200,
    backgroundColor: theme.palette.background.dark,
    backgroundSize: "contain"
  },
  likedButton: {
    color: colors.red[600]
  },
  membersIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1)
  }
}));

const SalsaCard: FC<SalsaCardProps> = ({ className, project, ...rest }) => {
  const classes = useStyles();
  const [isLiked, setLiked] = useState<boolean>(project.isLiked);
  const [likesCount, setLikesCount] = useState<number>(project.likesCount);

  const handleLike = (): void => {
    setLiked(true);
    setLikesCount((prevLikes) => prevLikes + 1);
  };

  const handleUnlike = (): void => {
    setLiked(false);
    setLikesCount((prevLikes) => prevLikes - 1);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      
        <Box
        //   display="flex"
        //   alignItems="center"
        //   mt={2}
        >
            <Link
              color="textPrimary"
              component={RouterLink}
              to="#"
              variant="h5"
            >
              {project.title}
            </Link>
        </Box>
      <Box p={3}>
        <CardMedia
          className={classes.image}
          image={project.image}
        />
      </Box>
      <Box
        pb={2}
        px={3}
      >
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {project.caption}
        </Typography>
      </Box>
      <Box
        pb={2}
        px={3}
      >
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {project.donation}
        </Typography>
      </Box>
      <Divider />
      <Box
        py={2}
        pl={2}
        pr={3}
        display="flex"
        alignItems="center"
      >
        {isLiked ? (
          <Tooltip title="Unlike">
            <IconButton
              className={classes.likedButton}
              onClick={handleUnlike}
            >
              <FavoriteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Like">
            <IconButton onClick={handleLike}>
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <Typography
          variant="subtitle2"
          color="textSecondary"
        >
          {likesCount}
        </Typography>
        <SvgIcon
          fontSize="small"
          color="action"
          className={classes.membersIcon}
        >
          <UsersIcon />
        </SvgIcon>
        <Typography
          variant="subtitle2"
          color="textSecondary"
        >
          {project.membersCount}
        </Typography>
        <Box flexGrow={1} />
        <Rating
          value={project.rating}
          size="small"
          readOnly
        />
      </Box>
    </Card>
  );
};

SalsaCard.propTypes = {
  className: PropTypes.string,
  // @ts-ignore
  project: PropTypes.object.isRequired
};

export default SalsaCard;
