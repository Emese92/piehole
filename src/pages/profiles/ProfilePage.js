import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import Recipe from "../recipes/Recipe";
import { fetchMoreData } from "../../utils/Utils";
import NoResults from "../../assets/no-results.gif";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import avatarStyles from "../../styles/Avatar.module.css";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { id } = useParams();
  const [pageProfile, setPageProfile] = useState({ results: [] });
  const [profile] = pageProfile.results;
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/recipes/?owner__profile=${id}`),
          ]);
        setPageProfile({ results: [pageProfile] });
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    handleMount();
  }, [id]);

  const mainProfile = (
    <>
      <Row className="justify-content-center align-items-center h-100">
        <Col lg={9}>
          <Card
            className="text-center m-2"
            style={{ borderRadius: "15px", maxWidth: "800px" }}
          >
            {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
            <Image
              style={{ width: "150px", height: "150px" }}
              className={`mx-auto ${avatarStyles.Avatar}`}
              src={profile?.image}
            />
            <h3 className="mt-3">
              <strong>{profile?.owner}</strong>
            </h3>
            <div>{profile?.recipes_count}</div>
            <div className="text-uppercase pb-4">posts</div>
          </Card>
        </Col>
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Recipe key={post.id} {...post} setRecipes={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col>
        <Container>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default ProfilePage;
