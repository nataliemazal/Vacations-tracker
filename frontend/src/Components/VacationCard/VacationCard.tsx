import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import SocketService from "../Service/SocketService";




const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 800,
        margin: "10px"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', 
    },
    content: {

        textAlign: 'left'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        color: "red",
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
        color: "green",
    },

    followed: {
        color: "red"
    },
    unfollowed: {}
}));

interface VacationCardProps {
    vacation_id: number
    description: string;
    destination: string;
    start_date: string;
    end_date: string;
    price: number;
    image: string;
    uuid: string;
    isUserFollow: boolean
    isAdmin: number
    followers: number
}

interface FollowerModel {
    uuid: string;
    vacation_id: number

}




export default function VacationCard(props: VacationCardProps): JSX.Element {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [unfollow, setUnfollowed] = useState(false);
    

    const [user_vacation, setUser_vacation] = useState<FollowerModel | undefined>(undefined);

    const handleExpandClick = () => {
        console.log(expanded)
        setExpanded(!expanded);
        console.log(expanded)
    };

    React.useEffect(() => {
        if (user_vacation !== undefined) {
            console.log(user_vacation)
            let followThisVacation = async function () {
                try {
                    await axios.put<FollowerModel[]>(
                        `http://localhost:3001/api/vacations`, user_vacation
                    )

                }
                catch (err) {
                    console.log(err);
                    alert("Error while ");
                }
            }
            followThisVacation()
        }
    }, [user_vacation]);

    const socketService: SocketService = new SocketService();
    const handleAddToFollowed = () => {
        setUnfollowed(!unfollow)
        const uv = { uuid: props.uuid, vacation_id: props.vacation_id }
        setUser_vacation(uv)
        socketService.connect();
        socketService.send("msg-from-client");
    }

    const handleDeliteVacation = async () => {
      
        try {
            await axios.delete<VacationCardProps>(
                `http://localhost:3001/api/admin/vacations/${props.vacation_id}`
            )

            socketService.connect();
            socketService.send("msg-from-client");
          

        }
        catch (err) {
            console.log(err);
            alert(`Error while trying delete vacation ${props.destination}`);
        }
    }




    return (
        <div id="vacationCard">
          
            <Card className={classes.root} style={{ width: "300px" }}>

                <CardMedia
                    className={classes.media}
                    image={`http://localhost:3001/api/images/${props.image}`}
                    title={props.image}
                />
                <CardContent className={classes.content}>
                    <Typography variant="body2" color="primary" component="p">
                        {props.destination}
                    </Typography>

                    <Typography variant="body2" color="inherit" component="p">
                        {props.price} usd
                    </Typography>

                    <Typography variant="body2" color="primary" component="p">
                        {props.followers} followers
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.start_date} - {props.end_date}
                    </Typography>
                </CardContent>
              

                {props.isAdmin !== 1 &&
                    <IconButton
                        aria-label="add to favorites"
                        onClick={handleAddToFollowed}
                        className={clsx(classes.unfollowed, {
                            [classes.followed]: props.isUserFollow,
                        })}
                    >
                        <FavoriteIcon />
                    </IconButton>}

                {props.isAdmin === 1 &&
                    <div>
                        <IconButton
                            aria-label="delete vacation"
                            onClick={handleDeliteVacation}
                            className={clsx(classes.unfollowed, {
                                [classes.followed]: props.isUserFollow,
                            })}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <Link to={`/editVacation/${props.vacation_id}`} >
                            <EditIcon />

                        </Link>
                    </div>
                }

                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            {props.description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div >
    );
}

