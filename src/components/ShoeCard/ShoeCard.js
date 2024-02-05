import React from 'react';
import styled from 'styled-components/macro';

import {COLORS, WEIGHTS} from '../../constants';
import {formatPrice, isNewShoe, pluralize} from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
					  slug,
					  name,
					  imageSrc,
					  price,
					  salePrice,
					  releaseDate,
					  numOfColors,
				  }) => {
	// There are 3 variants possible, based on the props:
	//   - new-release
	//   - on-sale
	//   - default
	//
	// Any shoe released in the last month will be considered
	// `new-release`. Any shoe with a `salePrice` will be
	// on-sale. In theory, it is possible for a shoe to be
	// both on-sale and new-release, but in this case, `on-sale`
	// will triumph and be the variant used.
	// prettier-ignore
	const variant = typeof salePrice === 'number'
		? 'on-sale'
		: isNewShoe(releaseDate)
			? 'new-release'
			: 'default'

	return (
		<Link href={`/shoe/${slug}`}>
			<Wrapper>
				<ImageWrapper>
					{variant === 'on-sale' && <SaleFlag>Sale</SaleFlag>}
					{variant === 'new-release' && <NewReleaseFlag>Just Released!</NewReleaseFlag>}
					<Image alt="" src={imageSrc}/>
				</ImageWrapper>
				<Spacer size={12}/>
				<DetailWrapper>
					<Row>
						<Name>{name}</Name>
						<ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
					</Row>
					<Row>
						{salePrice ?
							<>
								<Price onSale>{formatPrice(price)}</Price>
								<SalePrice>{formatPrice(salePrice)}</SalePrice>
							</>
							:
							<Price>{formatPrice(price)}</Price>
						}
					</Row>
				</DetailWrapper>
			</Wrapper>
		</Link>
	);
};

const Link = styled.a`
    text-decoration: none;
    color: inherit;
`;

const Wrapper = styled.article`
    margin-bottom: 30px;
`;

const ImageWrapper = styled.div`
    position: relative;
`;

const Adornment = styled.div`
    position: absolute;
    top: 12px;
    right: -4px;
    border-radius: 2px;
    padding: 0 10px;
    height: 32px;
    line-height: 32px;
    color: white;
	font-size: ${14 / 16}rem;
    font-weight: ${WEIGHTS.bold};
`

const SaleFlag = styled(Adornment)`
	background-color: ${COLORS.primary};
`

const NewReleaseFlag = styled(Adornment)`
    background-color: ${COLORS.secondary};
`

const DetailWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const Image = styled.img`
	width: 100%;
    border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
    font-size: 1rem;
    display: flex;
    flex-direction: column;
`;

const Name = styled.h3`
    font-weight: ${WEIGHTS.medium};
    color: ${COLORS.gray[900]};
`;

const Price = styled.span`
    color: ${props => props.onSale ? COLORS.gray["700"] : 'inherit'};
    text-decoration: ${props => props.onSale ? 'line-through' : 'none'};
`;

const ColorInfo = styled.p`
    color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
    font-weight: ${WEIGHTS.medium};
    color: ${COLORS.primary};
`;

export default ShoeCard;
