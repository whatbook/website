import React, { Component } from 'react';
import { Card } from '@material-ui/core'
import { withStyles, WithStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import image from '../images/WechatIMG303.png'
const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

export interface Props extends WithStyles<typeof styles> { }

class CollectionCard extends Component<Props> {
  render() {
    const { classes } = this.props

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={image}
            title='Contemplative Reptile'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              Lizard
          </Typography>
            <Typography component='p'>
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
          </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size='small' color='primary'>
            Share
        </Button>
          <Button size='small' color='primary'>
            Learn More
        </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(CollectionCard)
