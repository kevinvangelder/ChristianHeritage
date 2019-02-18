import * as React from "react"
import {
  View,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native"
import { Text } from "../../shared/text"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../shared/screen"
import { TitleBar } from "../../../views/shared/title-bar"
import { spacing } from "../../../theme/spacing"
import { palette } from "../../../theme/palette"
import { Button } from "../../shared/button"

export interface ScheduleDetailScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[3],
  width: "100%",
}

const TITLE: TextStyle = {
  marginBottom: spacing[3],
}

const KEYNOTE_WRAPPER: TextStyle = {
  flexDirection: "row",
}

const KEYNOTE_CONTENT: TextStyle = {
  flexDirection: "column",
  flex: 2,
  paddingRight: spacing[1],
}

const SPEAKER: TextStyle = {
  marginBottom: spacing[1],
}

const TIME: TextStyle = {
  marginBottom: spacing[2],
}

const DESCRIPTION: TextStyle = {
  marginBottom: spacing[2],
}
const IMAGE_WRAPPER: ViewStyle = {
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  maxHeight: 180,
  marginBottom: spacing[2],
}
const IMAGE: ImageStyle = {
  width: 120,
  resizeMode: "contain",
  maxHeight: 200,
}

const ACTIVITY: ViewStyle = {
  borderBottomColor: palette.lightGrey,
  borderBottomWidth: 1,
  paddingVertical: spacing[3],
}

const INVISIBLE: ViewStyle = {
  height: 0,
  width: 0,
}

const IMAGES = {
  "Dr. Voddie Baucham, Jr.": require("./Voddie_Baucham.png"),
  "Allan Blain": require("./Allan_Blain.png"),
  "Carol Becker": require("./Carol_Becker.png"),
  "Corlette Sande": require("./Corlette_Sande.png"),
  "David McAlvany": require("./David_McAlvany.png"),
  "Elliott Neff": require("./Elliott_Neff.png"),
  "Heather Haupt": require("./Heather_Haupt.png"),
  "Jake MacAulay": require("./Jake_MacAulay.png"),
  "Jeff Sande": require("./Jeff_Sande.png"),
  "Ken Sande": require("./Ken_Sande.png"),
  "Kevin Swanson": require("./Kevin_Swanson.png"),
  "Mary Craig": require("./Mary_Craig.png"),
  "Mike Snavely": require("./Mike_Snavely.png"),
  "Neil Craig": require("./Neil_Craig.png"),
  "Pat Roy": require("./Pat_Roy.png"),
  "Rhea Perry": require("./Rhea_Perry.png"),
  "Scott LaPierre": require("./Scott_LaPierre.png"),
  "Tim Roth": require("./Tim_Roth.png"),
  "Vicki Bentley": require("./Vicki_Bentley.png"),
  "Wes Olson": require("./Wes_Olson.png"),
}
const BIOS = {
  "Dr. Voddie Baucham, Jr.":
    "Voddie is a husband, father, pastor, author, professor, and church planter. He currently serves as Dean of Theology at African Christian University in Lusaka, Zambia. By emphasizing cultural apologetics, he helps people understand the significance of thinking and living biblically in every area of life. Voddie and his wife, Bridget, have nine children and are committed home educators.",
  "Ken Sande":
    "Ken, an engineer, lawyer, and mediator, founded Peacemaker Ministries where he conciliated family, business, church, and legal conflicts and guided development of a global training program. He is President and founder of RW360, which teaches people to get upstream of conflict by building strong relationships in the family, church, and workplace. Ken is the author of books, articles, and training resources, including The Peacemaker, which has sold over 500,000 copies in seventeen languages.",
  "Jeff Sande":
    "Jeff is Director of Training and Marketing at RW360. He travels globally to churches, youth conferences, and corporate training seminars. A graduate of Montana State University-Billings in Business Management and Marketing, he mentored elementary school students, volunteering at schools and camps to teach peacemaking to young children.",
  "Kevin Swanson":
    "Kevin is pastor of Reformation Church of Elizabeth in Colorado and has an interest in education and teaching in schools-homeschool, public, Christian, and college. He hosts a daily radio program, Generations, and teaches on biblical worldview, Christian education, family discipleship, and cultural discernment of modern music and movies. With his wife, Brenda, he raised their five children, homeschooling them the whole way.",
  "David McAlvany":
    "David is a thought leader on the global economy and author of The Intentional Legacy, a book about creating meaningful family culture. A Biola graduate, then Morgan Stanley wealth manager, now guest on national television and at financial seminars around the world, he is the second-generation CEO of McAlvany Financial Companies. He and his wife, Mary Catherine, homeschool using theater, daily readings, hiking, cooking, and church life, with a priority on togetherness.",
  "Wes Olson":
    "Wes owns Westfield Studios and produces the 101 Series film to glorify God with an easy to use, understandable, and visually rich high school homeschool curriculum from a biblical perspective. Biology 101, Chemistry 101, Physics 101, and General Science 101 are in production. After graduating from film school and Multnomah Bible College, Wes produced corporate films for fifteen years. He and his wife, Tammy, have four children and seven grandchildren. They have been homeschooling over thirty years!",
  "Rhea Perry":
    "Rhea taught seven children at home and now educates entrepreneurs, helping families start home businesses through her company, Educating for Success. As an award-winning Internet business owner and now a widow, she shares her knowledge from twenty-nine years of homeschooling young people to be business owners, and loves encouraging parents to train others to serve God by serving mankind and building financial freedom.",
  "Carol Becker":
    "Carol, with her husband, Jim, homeschooled two children (K-12th) that graduated college. Having an Engineering BS and System Science MS, Carol directed a multiple-age co-op and a science co-op.  She taught Composition, American and British Literature, Algebra I & 2, and Geometry for homeschooled teens and tutored writing students. As an HSLDA High School Consultant, she writes articles, newsletters, and blogs to encourage and equip parents.",
  "Heather Haupt":
    "Heather is the mother of three knights-in-training and a spunky little princess. Her intention is to raise them to make a difference in this world. Recognizing the brevity of childhood and power of a parent’s influence, Heather inspires and equips families toward intentional parenting, pursuing God, and delighting in the learning adventure. She is author of Knights-in-Training: Ten Principles for Raising Honorable, Courageous and Compassionate Boys and The Ultimate Guide to Brain Breaks.",
  "Elliott Neff":
    "Elliott is a homeschool graduate, husband, father, National Master in Chess, author of A Pawn’s Journey, and founder/CEO of Chess4Life. Chess4Life programs help thousands of kids develop life skills weekly across the country. Elliott’s coaching expertise is reflected in his recent certification as a USCF Level V Coach, an honor that fewer than a dozen top level coaches in the U.S. share.",
  "Jake MacAulay":
    "Jake is a homeschooling father, ordained minister, former syndicated talk show host, and CEO at Institute on the Constitution (IOTC), an educational outreach that presents the founders’ biblical view of law and government. He speaks to audiences nationwide and is seen in many media outlets. He started American Club, a constitutional study group in public and private schools.",
  "Mike Snavely":
    "Mike, son of missionaries, grew up in South Africa. After college he returned to work in Kruger National Park then came again as a missionary. His ministry, Mission Imperative, teaches creation-oriented issues. He is a Creation Science Hall of Fame inductee, author of Creation or Evolution (curriculum), producer of creation DVDs, and developer of two unique excursions – Southwest Safari and African Wildlife Safari. With his wife, Carrie, he home-educated three children.",
  "Vicki Bentley":
    "Vicki has a heart for parents and shares practical wisdom and encouraging words. She has eight daughters, is foster mom of fifty, and is grandma to twenty-three grandbabies and four great-grandbabies. She is HSLDA’s Toddlers to Tweens consultant and Group Services director, a speaker, and an author of homeschooling and homemaking books. Vicki homeschooled seventeen children with her husband, Jim, led support groups, and was a Home Educators Association of Virginia board member.",
  "Pat Roy":
    "Pat was Director of Broadcast Media at the Institute for Creation Research for twelve years. During this time, he and his wife created the creation-based Jonathan Park audio dramas heard by millions around the world. They also created the new audio drama, Time Chroniclers. Then as Director at Genesis Apologetics he traveled the nation speaking to hundreds of audiences, of all ages, about the importance of trusting God’s Word.",
  "Tim Roth":
    "Tim Roth has been married to Ruth for forty years and they have nine children and ten grandchildren. He has served as pastor for forty-five years, chaplain with the local fire department for twenty-five years, and board member with Christian Heritage from the beginning. He enjoys hiking, gardening, and playing with his grandchildren. With his family, he ministers in their church, community, and to homeschoolers across the state.",
  "Mary Craig":
    "Mary is the wife of Neil Craig, mother of five, and grandmother of eighteen under age twelve. Since her children were small, she has desired to learn and grow in parenting. She can witness that God has always sent help via people and resources. Now she desires to pass this wisdom along to others looking for help and hope.",
  "Corlette Sande":
    "Corlette has degrees in Elementary Education and Counseling and is certified as a Relational Wisdom Instructor. As RW360’s Director of Ministry Relations, she counsels families and mediates child custody disputes. She authored the Young Peacemaker curriculum, teaching conflict resolution to parents and children around the world. She enhances Ken’s teaching with her own insights and provides encouragement and counsel.",
  "Scott LaPierre":
    "Scott is Senior Pastor of Woodland Christian Church in Woodland, Washington, as well as an author and conference speaker. He and his wife, Katie, grew up together in northern California, and God has blessed them with seven children.",
  "Allan Blain":
    "Allan is an entrepreneur, trainer, and coach. With his wife, Nicole, they’ve homeschooled six children for eighteen years. Over twenty-five years, Allan owned several companies, including a real estate development company. As CEO, he grew it from $10 to over $40 million/year in revenue. His greatest satisfaction professionally comes from helping dad-preneurs and mom-preneurs to integrate family into their work-life.",
  "Neil Craig":
    "Neil was Minister of Music in several churches and served as arranger, accompanist, and Director of Music of an international Bible-teaching ministry. Neil is President and Executive Director of Christian Heritage Home Educators of Washington and instructs and directs the annual Christian Heritage Chorale. He and his wife, Mary, are on the Christian Heritage Board.",
}

export class ScheduleDetailScreen extends React.Component<ScheduleDetailScreenProps, {}> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: TitleBar,
  })

  openBio(speakerName, bio) {
    Alert.alert(speakerName, bio)
  }

  render() {
    return (
      <Screen preset="fixed">
        <TitleBar
          back
          onPress={this.props.navigation.popToTop}
          title={this.props.navigation.state.params.title}
        />
        {this.renderContent()}
      </Screen>
    )
  }

  renderContent = () => {
    const { title } = this.props.navigation.state.params
    if (title === "Keynote") {
      return this.renderKeynote()
    } else {
      return this.renderOther()
    }
  }

  renderKeynote = () => {
    const { timeSlotActivities, item } = this.props.navigation.state.params
    const activity = timeSlotActivities[0]
    return (
      <ScrollView style={ROOT}>
        <Text preset="header" text={activity.name} style={TITLE} />
        <View style={KEYNOTE_WRAPPER}>
          <View style={KEYNOTE_CONTENT}>
            <Text
              preset="subheader"
              text={activity.speaker}
              style={SPEAKER}
              onPress={() => this.openBio(activity.speaker, BIOS[activity.speaker])}
            />
            <Text preset="fieldLabel" text={`${item.startTime} - ${item.endTime}`} style={TIME} />
            <Text preset="default" text={activity.description} style={DESCRIPTION} />
            {/* <Text preset="default" text={BIOS[activity.speaker]} style={DESCRIPTION} /> */}
          </View>
          <TouchableOpacity
            onPress={() => this.openBio(activity.speaker, BIOS[activity.speaker])}
            style={IMAGE_WRAPPER}
          >
            <Image source={IMAGES[activity.speaker]} style={IMAGE} />
          </TouchableOpacity>
        </View>
        {activity.RECID && <Button text="Add to Cart" />}
      </ScrollView>
    )
  }

  renderOther = () => {
    const { timeSlotActivities } = this.props.navigation.state.params
    return (
      <ScrollView style={ROOT} contentContainerStyle={{ paddingBottom: spacing[3] }}>
        {timeSlotActivities.map(activity => this.renderActivity(activity))}
      </ScrollView>
    )
  }

  renderActivity = activity => {
    return (
      <View style={ACTIVITY} key={activity.name}>
        <Text preset="subheader" text={activity.name} style={TITLE} />
        <View style={KEYNOTE_WRAPPER}>
          <View style={KEYNOTE_CONTENT}>
            {activity.speaker ? (
              <Text
                preset="default"
                text={activity.speaker}
                style={SPEAKER}
                onPress={() => this.openBio(activity.speaker, BIOS[activity.speaker])}
              />
            ) : (
              <View style={INVISIBLE} />
            )}
            {activity.location ? (
              <Text preset="fieldLabel" text={activity.location} style={TIME} />
            ) : (
              <View style={INVISIBLE} />
            )}
            {activity.description ? (
              <Text preset="secondary" text={activity.description} style={DESCRIPTION} />
            ) : (
              <View style={INVISIBLE} />
            )}
            {/* <Text preset="secondary" text={BIOS[activity.speaker]} style={DESCRIPTION} /> */}
          </View>
          <TouchableOpacity
            onPress={() => this.openBio(activity.speaker, BIOS[activity.speaker])}
            style={IMAGE_WRAPPER}
          >
            <Image source={IMAGES[activity.speaker]} style={IMAGE} />
          </TouchableOpacity>
        </View>
        {activity.RECID && <Button text="Add to Cart" />}
      </View>
    )
  }
}
