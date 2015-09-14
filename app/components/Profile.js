import React from 'react';
import Repos from '../components/Github/Repos';
import UserProfile from '../components/Github/UserProfile';
import Notes from '../components/Notes/Notes';
import Firebase from 'firebase';
import helpers from '../utils/helpers';

class Profile extends React.Component{
    constructor(props){
        // lolwhatdoesthisdo
        super(props);

        this.state = {
            notes: [],
            bio: {},
            repos: []
        };
    }
    init() {
        helpers.getGithubInfo(this.getParams().username)
            .then(function (dataObj) {
                this.setState({
                    bio: dataObj.bio,
                    repos: dataObj.repos
                })
            });
    }
    componentWillMount(){
        this.router = this.context.router;
    }
    componentDidMount(){
        // Called after Component mounts the view
        this.init();
    }
    componentWillUnmount(){
        // Will remove listener after component destroyed.

    }
    componentWillReceiveProps(){

        this.init();
    }
    render() {
        var username = this.router.getCurrentParams().username;

        return (
            <div className="row">
                <div className="col-md-4">
                    <UserProfile username={username} bio={this.state.bio} />
                </div>
                <div className="col-md-4">
                    <Repos username={username} repos={this.state.repos} />
                </div>
                <div className="col-md-4">
                    <Notes
                    username={username}
                    notes={this.state.notes}
                    addNote={this.handleAddNote} />
                </div>
            </div>

        )
    }
};

Profile.contextTypes = {
    router: React.PropTypes.func.isRequired
};

export default Profile;