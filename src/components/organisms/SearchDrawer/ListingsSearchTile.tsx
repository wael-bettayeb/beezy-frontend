import React, { useState } from "react";
import { useStyletron } from "baseui";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import {
  Caption1,
  Caption2,
  Label3,
  LabelMedium,
  LabelSmall,
  LabelXSmall,
  Paragraph1,
  Paragraph4,
} from "baseui/typography";

import { SearchProvider, WithSearch } from "@elastic/react-search-ui";

import { StyledLink } from "baseui/link";

import { Block } from "baseui/block";
import Router from "next/router";
import { Cell, Grid } from "baseui/layout-grid";
import TimeAgo from "@components/atoms/TimeAgo";
import { Card, StyledAction, StyledBody } from "baseui/card";

interface Props {
  searchedTerm: string;
}

const ListingsSearchTile = (props: Props) => {
  const [css, theme] = useStyletron();
  const connector = new AppSearchAPIConnector({
    searchKey: "search-v8bawehypykhcvry7p2soobg",
    engineName: "listings",
    endpointBase: "http://127.0.0.1:3002",
    cacheResponses: true,
  });
  const config = {
    apiConnector: connector,
    trackUrlState: false,
  };
  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({
          searchTerm,
          setSearchTerm,
          results,
          setResultsPerPage,
          setCurrent,
        }) => ({
          searchTerm,
          setSearchTerm,
          results,
          setResultsPerPage,
          setCurrent,
        })}
      >
        {({
          searchTerm,
          setSearchTerm,
          results,
          setResultsPerPage,
          setCurrent,
        }) => {
          setSearchTerm(props.searchedTerm);
          setResultsPerPage(8);
          setCurrent(1);
          return (
            <div
              className={css({
                width: "100%",
                paddingLeft: 0,
                paddingRight: 0,
                flex: "1 0 auto",
              })}
            >
              {!results.length ? (
                <Block
                  width="100%"
                  height="100%"
                  display={"flex"}
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  marginTop={theme.sizing.scale600}
                >
                  <Label3 color={theme.colors.contentInverseSecondary}>
                    No data
                  </Label3>
                </Block>
              ) : (
                <div
                  className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignContent: "center",
                    marginBottom: theme.sizing.scale400,
                  })}
                >
                  <Label3>Business</Label3>
                  <StyledLink href="#">Show more</StyledLink>
                </div>
              )}
              <Grid gridMargins={10} gridGaps={10} gridGutters={10}>
                {results.map((r) => (
                  <Cell span={[2, 4, 4]}>
                    <div
                      onClick={() =>
                        Router.push(
                          "/listing/[id]",
                          `/listing/${r.id.raw.substring(8)}`
                        )
                      }
                    >
                      <Card
                        headerImage={r.url.raw}
                        title={<LabelMedium>{r.title.raw}</LabelMedium>}
                      >
                        <StyledBody>
                          <Paragraph4>
                            <TimeAgo date={r.created_at.raw} />
                          </Paragraph4>
                        </StyledBody>
                        <StyledAction></StyledAction>
                      </Card>
                    </div>
                  </Cell>
                ))}
              </Grid>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
};

export default ListingsSearchTile;
